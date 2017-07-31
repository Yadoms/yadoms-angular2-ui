import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { RestResult } from './rest-result';
import { ErrorService, ErrorCodes, ErrorInfo } from './error.service';
import { Utilities } from '../shared/utilities';
import { Location } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { RuntimeConfigurationService, RuntimeConfiguration } from '../runtime.configuration.service';

@Injectable()
export class RestServerService {
    /**
     * Concatenate to url parts
     * @param {string} url1 The first part
     * @param {string} url2 The second part
     * @return {string} The concatenation of the two parts with managing "/"
     * @private
     */
    private static concatenateUrl_(url1: string, url2: string): string {
        // on ajoute le "/" s'il n'y est pas a la fin de l'url
        if (url1 !== undefined && url1.length > 0 && url2 !== undefined && url2.length > 0) {

            // cas : aucun slash présent
            // si url1 ne se termine pas par "/" et que url2 ne commence par par "/" alors on ajoute un "/" entre les deux
            if (url1[url1.length - 1] !== '/' && url2[0] !== '/') {
                return url1 + '/' + url2;
            }

            // cas : double slash
            // si url1 se termine par "/" et url2 commence par "/" alors on supprime le "/" de url1 et on concatene url2
            if (url1[url1.length - 1] === '/' && url2[0] === '/') {
                return url1.slice(0, -1) + url2;
            }
        }

        // cas par défaut
        return url1 + url2;
    }

    /**
     * Le chemin de server
     */
    private _absoluteServerPath: string;

   /**
    * Ce champs permet de conserver une version cryptée du mot de passe lors de l'identification. Il sera utilisé pour le calcul de signature de trames par la suite
    * Il a une valeur par défaut partagée entre le client et le serveur
    * @private
    */
    private encryptedPassword: string = null;

    /**
     * Salt used to stengthen encryption
     * @private
     */
    private salt: string = '113PW56ynmX85Gz';

    /**
     * Contient le token utilisé pour la session.
     * @private
     */
    private token: string = null;

    constructor(private http: Http, private router: Router, private location: Location, private errorService: ErrorService, private runtimeConfiguration: RuntimeConfigurationService) {
        console.log('GSS Rest server location : ' + this.getServerAbsolutePath_());
    }

    /**
     * Send a REST GET asynchronous request without managing authentication (used to log in)
     * @param {string} url The URL requested : "/devices/32"
     * @return a promise
     */
    public getWithoutAuthentication<T>(url: string): Promise<T | ArrayBuffer> {
        return this.restCall<T>('GET', url);
    }

    /**
     * Send a REST GET asynchronous request
     * @param {string} url The URL requested : "/devices/32"
     * @return a promise
     */
    public get<T>(url: string, data?: any): Promise<T> {
        return this.restCallAuthenticated<T>('GET', url, data);
    }

    /**
     * Send a REST PUT asynchronous request
     * @param {string} url The URL to request : "/devices/32"
     * @param {JSON} data The request data
     * @return a promise
     */
    public put<T>(url: string, data?: any): Promise<T> {
        return this.restCallAuthenticated<T>('PUT', url, data);
    }

    /**
     * Send a REST POST asynchronous request
     * @param {string} url The URL request : "/devices/32"
     * @param {JSON} data The request data
     * @return a promise
     */
    public post<T>(url: string, data?: any, multipart?: boolean, receiveOnlyBinary?: boolean): Promise<T> {
        return this.restCallAuthenticated<T>('POST', url, data, multipart, receiveOnlyBinary);
    }

    /**
     * Send a REST DELETE asynchronous request
     * @param {string} url The URL request : "/devices/32"
     * @param {JSON} data The request data
     * @return a promise
     */
    public delete<T>(url: string, data?: any): Promise<T> {
        return this.restCallAuthenticated<T>('DELETE', url, data);
    }

    /**
     * Define the password used to compute the signature
     * @param {string} password to set
     */
    public setPassword(password: string) {
        const passwordHash = CryptoJS.MD5(password).toString().toUpperCase();
        this.encryptedPassword = CryptoJS.SHA1(CryptoJS.SHA1(passwordHash) + this.salt).toString();
    }

    /**
     * Define the encrypted password used to compute the signature
     * @param {string} password to set
     */
    public setEncryptedPassword(encryptedPassword: string) {
        this.encryptedPassword = encryptedPassword;
    }

    /**
     * Permit to get the encrypted password
     * @return {string} the token
     */
    public getEncryptedPassword(): string {
        return this.encryptedPassword;
    }

    /**
     * Define the token used to make server request
     * @param {string} token to set
     */
    public setToken(token: string) {
        this.token = token;
    }

    /**
     * Permit to get the token
     * @return {string} the token
     */
    public getToken(): string {
        return this.token;
    }

    /**
     * Permit to know if the user has been authenticated
     * @return {bool} true if the user has been authenticated
     */
    public hasBeenAuthenticated(): boolean {
        return !Utilities.isNullOrUndefined(this.token);
    }

     /**
      * Send isAlive rest request
      * @return an observable
      */
    public isAlive(): Promise<boolean> {
        return new Promise<boolean>( (resolve: (value?: boolean) => void, reject: (reason?: any) => void) => {
            const fullUrlToUse: string = RestServerService.concatenateUrl_(this.getServerAbsolutePath_(), 'rest/isAlive');
            this.http.get ( fullUrlToUse )
                .timeout(45000)
                .retry(0)
                .subscribe( (res: Response) => {
                    try {
                        const result: RestResult = res.json();
                        if (result && result.result === true) {
                            resolve(true);
                        } else {
                            this.errorService.createRestErrorMessage(result)
                            .then(reject)
                            .catch(reject);
                        }
                    } catch (error) {
                        this.errorService.createUnknownError(error). then(reject) .catch(reject);
                    }
                }, reject);
        });
    }

    /**
     * Send a REST generic asynchronous request using authentication engine
     * @param {string} type of the request  : "GET", "POST", "DELETE", "POST"
     * @param {string} url The URL request : "/devices/32"
     * @param {JSON} data The request data
     * @param {bool} sync Indicate if the query is synchronous
     * @return a promise
     */
    private restCallAuthenticated<T>(type: string, url: string, data?: any, multipart?: boolean, receiveOnlyBinary?: boolean): Promise<T> {
        return new Promise<T>( (resolve: (value?: T) => void, reject: (reason?: any) => void) => {
            if (this.hasBeenAuthenticated()) {
                this.restCall<T>(type, RestServerService.concatenateUrl_(url, this.getToken()), data, multipart, receiveOnlyBinary)
                .then(resolve, (rejected: ErrorInfo) => {
                        // si pas une erreur de connexion serveur
                        if (rejected.code !== ErrorCodes.CONNECTION_UNAVAILABLE) {
                            // en fonction du code d'authentification on reinitialise le moteur d'authentification
                            this.token = null;
                            this.router.navigate(['/']);
                        }
                        reject(rejected);
                    })
                .catch(reject);
            } else {
                // TODO : router vers l'ecran de login
                this.errorService.createErrorMessage(ErrorCodes.USER_NOT_AUTHENTICATED,  'User hasn\'t authenticate before' )
                    .then(reject, reject).catch(reject);
            }
        });
    }

    /**
     * Send a REST asynchronous request
     * @param {string} type of the request  : "GET", "POST", "DELETE", "POST"
     * @param {string} url The URL request : "/devices/32"
     * @param {JSON} data The request data
     * @param {boolean} multipart If true use FormData to send data, else send data directly
     * @param {receiveOnlyBinary} receiveOnlyBinary If true assume the result is only binary (return ArrayBuffer), else expect standard Json response
     * @return a promise
     */
    private restCall<T>(type: string, url: string, data?: any, multipart?: boolean, receiveOnlyBinary?: boolean): Promise<T | ArrayBuffer> {
        return new Promise<T | ArrayBuffer>( (resolve: (value?: T | ArrayBuffer) => void, reject: (reason?: any) => void) => {
            if (!type) {
                reject('request TYPE must be defined');
                return;
            }
            if (!url) {
                reject('request URL must be defined');
                return;
            }
            if (!this.encryptedPassword) {
                reject('this.setPassword() must be called before');
                return;
            }

            // on doit ajouter le timestamp et la signature
            const date = new Date();
            const timestamp = date.toISOString().replace(/-/g, '_').replace(/:/g, '_').replace(/\./g, '_');
            let fullUrlToSign: string = url;
            let fullUrlToUse = RestServerService.concatenateUrl_(this.getServerAbsolutePath_(), url);
            fullUrlToSign = RestServerService.concatenateUrl_(fullUrlToSign, timestamp);
            fullUrlToUse = RestServerService.concatenateUrl_(fullUrlToUse, timestamp);

            // on calcule la signature (cf http://blog.ineat-conseil.fr/2013/01/restful-authentication/)
            // l'url doit etre de la forme GET:/rest/login/{login}/timestamp
            fullUrlToSign = type.toUpperCase() + ':' + fullUrlToSign;

            const signature = CryptoJS.HmacSHA1(fullUrlToSign, this.encryptedPassword, undefined).toString();
            fullUrlToUse = fullUrlToUse + '/' + signature;

            const headers = new Headers();
            let body = null;
            if (multipart === true) {
                const fd = new FormData();
                fd.append('data', data);
                body = fd;
                headers.append( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            } else {
                body = data;
            }

            this .http
                .request(fullUrlToUse, { method: type, body, headers })
                .share()
                .retry(0)
                .timeout(90000)
                .subscribe( (res: Response) => {
                    try {
                        if (receiveOnlyBinary === true) {
                            resolve(res.arrayBuffer());
                        } else {
                            const result: RestResult = res.json();
                            if (result && result.result === true) {
                                resolve(result.data);
                            } else {
                                this.errorService.createRestErrorMessage(result). then(reject) .catch(reject);
                            }
                        }
                    } catch (error) {
                        this.errorService.createUnknownError(error). then(reject) .catch(reject);
                    }
                }, reject);
        });
    }

    /**
     * Get the asbolute server path (not url)
     * @return {string} The  asbolute server path
     * @private Should not be called outside server-rest.js
     */
    private getServerAbsolutePath_(): string {
        return this.runtimeConfiguration.get().gssServer.restUrl;
    }
}
