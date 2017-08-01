import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

    constructor(private http: HttpClient, private router: Router, private location: Location, private errorService: ErrorService, private runtimeConfiguration: RuntimeConfigurationService) {
        console.log('Yadoms Rest server location : ' + this.getServerAbsolutePath_());
    }

    /**
     * Send a REST GET asynchronous request
     * @param {string} url The URL requested : "/devices/32"
     * @return a promise
     */
    public get<T>(url: string, data?: any): Promise<T> {
        return this.restCall<T>('GET', url, data);
    }

    /**
     * Send a REST GET asynchronous request
     * @param {string} url The URL requested : "/devices/32"
     * @param {JSON} data The $.ajax options (dataType will be overwritten by 'script')
     * @return a promise
     */
    public getScript(url: string, data?: any): Promise<string> {
        return this.http.get(url, { responseType: 'text' }).toPromise();
    }

    /**
     * Send a REST GET asynchronous request
     * @param {string} url The URL requested : "/devices/32"
     * @param {JSON} data The $.ajax options (dataType will be overwritten by 'html')
     * @return a promise
     */
    public getHtml(url: string, data?: any): Promise<string> {
        return this.http.get(url, { responseType: 'text' }).toPromise();
    }

    /**
     * Send a REST PUT asynchronous request
     * @param {string} url The URL to request : "/devices/32"
     * @param {JSON} data The request data
     * @return a promise
     */
    public put<T>(url: string, data?: any): Promise<T> {
        return this.restCall<T>('PUT', url, data);
    }

    /**
     * Send a REST POST asynchronous request
     * @param {string} url The URL request : "/devices/32"
     * @param {JSON} data The request data
     * @return a promise
     */
    public post<T>(url: string, data?: any): Promise<T> {
        return this.restCall<T>('POST', url, data);
    }

    /**
     * Send a REST DELETE asynchronous request
     * @param {string} url The URL request : "/devices/32"
     * @param {JSON} data The request data
     * @return a promise
     */
    public delete<T>(url: string, data?: any): Promise<T> {
        return this.restCall<T>('DELETE', url, data);
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
    private restCall<T>(type: string, url: string, data?: any, options?: any): Promise<T> {
        return new Promise<T>( (resolve: (value?: T) => void, reject: (reason?: any) => void) => {
            if (!type) {
                reject('request TYPE must be defined');
                return;
            }
            if (!url) {
                reject('request URL must be defined');
                return;
            }

            const fullUrlToUse =  RestServerService.concatenateUrl_(RestServerService.concatenateUrl_(this.getServerAbsolutePath_(), 'rest'), url);

            const requestOptions: any = options || { };
            if (data) {
                requestOptions.body = data;
            }

            this .http
                .request<RestResult>(type, fullUrlToUse, requestOptions)
                .subscribe( (res: any) => {
                    if (res && res.result === true) {
                        resolve(res.data);
                    } else {
                        this.errorService.createRestErrorMessage(res).then(reject).catch(reject);
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
        return this.runtimeConfiguration.get().yadomsServer.restUrl;
    }
}
