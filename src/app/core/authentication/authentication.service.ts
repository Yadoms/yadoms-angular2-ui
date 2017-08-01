import { Injectable } from '@angular/core';
import { RestServerService } from '../restserver.service';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/core';
import { CookieOptions } from 'angular2-cookie/services/base-cookie-options';
import { AuthenticationResult } from './authentication.result';

@Injectable()
export class AuthenticationService {

  /**
   * store the URL so we can redirect after logging in
   */
  public redirectUrl: string;

  /**
   * Nom du cookie d'echange
   */
  private COOKIE_NAME_ = 'gss.authentication';

  /**
   * Le login actuellement connecté
   */
  private currentLogin: string = null;

  /**
   * Le service de cookies
   */
  private cookiesService: CookieService = new CookieService(new CookieOptions({ }));

  /**
   * Indique si la session est active
   */
  private sessionAlive: boolean;

  constructor(private restserverService: RestServerService) {
  }

  /**
   * Tente d'effectuer une authentification de l'utilisateur
   * @param login {string} The user login
   * @param password {string} The user password@
   * @return {Promise<AuthenticationResult>} A promise on AuthenticationResult
   */
  public tryAuthenticate(login: string, password: string): Promise<AuthenticationResult> {
    return new Promise<AuthenticationResult>( (resolve, reject) => {
      this.restserverService.setPassword(password);
      this.restserverService.getWithoutAuthentication<string>('rest/login/' + login)
      .then((token: string) => {
          this.currentLogin = login;
          // on est connecté donc on sauvegarde dans les cookies les informations utiles
          const cookieObject = { login, encryptedPassword : this.restserverService.getEncryptedPassword(), token };

          this.cookiesService.put(this.COOKIE_NAME_, JSON.stringify(cookieObject));
          // on sauvegarde le token
          this.restserverService.setToken(token);

          this.sessionAlive = true;
          resolve(new AuthenticationResult(true));
      })
      .catch((error: any) => {
          console.error('Error authenticating : ' + (error.message || error.toString()));
          resolve(new AuthenticationResult(false, error));
      });
    });
  }

   /**
    * Vérifie si la session actuelle est toujours active
    * @return {Promise<boolean>}
    */
  public get isSessionAlive(): Promise<boolean> {
    return new Promise<boolean>( (resolve, fail) => {
      if (this.sessionAlive) {
        resolve(true);
      } else {
        this.restserverService.get('rest/login/isSessionAlive')
        .then((result: boolean) => {
            this.sessionAlive = result;
            resolve(this.sessionAlive );
        })
        .catch((error: any) => {
            this.sessionAlive = false;
            resolve(this.sessionAlive );
        });
      }
    });
  }

  public hasBeenAuthenticated(): boolean {
    if (!this.restserverService.hasBeenAuthenticated()) {
        return this.reloadFromCookies();
    }
    return true;
  }

   /**
    * Obtient le login courant
    * @return {string} the token
    */
   public getLogin(): string {
      return this.currentLogin;
   }

  /**
   * Déconnecte l'utilisateur actuel
   */
   public signout(): void {
      this.currentLogin = null;
      // on veut se déconnecter donc on supprime les cookies
      this.cookiesService.remove(this.COOKIE_NAME_);
      // on met à null le token
      this.restserverService.setToken(null);

      this.sessionAlive = false;
   }

   /**
    * Rechage les informations de connexion depuis le cookie si disponible sinon ne fait rien
    * @return {boolean} true if connected by coockies, false all other cases
    */
   private reloadFromCookies(): boolean {
      // on regarde si on a le cookie qui existe. Si oui on recupere ses valeurs
      try {
         const cookieRead = this.cookiesService.get(this.COOKIE_NAME_);
         if (cookieRead) {
            const cookieObject = JSON.parse(cookieRead);
            this.currentLogin = cookieObject.login;
            this.restserverService.setEncryptedPassword(cookieObject.encryptedPassword);
            this.restserverService.setToken(cookieObject.token);
            return true;
         }
      } catch (err) {
         console.error('Unable to parse cookie stored.');
         this.cookiesService.remove(this.COOKIE_NAME_);
      }
      return false;
   }

}
