import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private _authenticationService: AuthenticationService, private router: Router)  {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>( ( resolve: (value?: boolean) => void, reject: (reason?: any) => void) => {
      console.log('AuthGuardService : canActivate' + this.router.url);

      this.checkLogin(this.router.url)
        .then((result: void) => { resolve(true); })
        .catch( (reason?: string) => {
          if (this.router.url !== '/login') {
            // Store the attempted URL for redirecting
            this._authenticationService.redirectUrl = this.router.url;

            // Navigate to the login page
            this.router.navigate(['/login']);
          }

          console.log('Fail to authenticate user : ' + reason);
          resolve(false);
        });
    });
  }

  public canLoad(route: Route): Promise<boolean> {
    return new Promise<boolean>( ( resolve: (value?: boolean) => void, reject: (reason?: any) => void) => {
      console.log('AuthGuardService : canLoad' + this.router.url);

      this.checkLogin(route.path)
        .then( (result: void) => { resolve(true); })
        .catch( (reason?: string) => {
          if (this.router.url !== '/login') {
            // Store the attempted URL for redirecting
            this._authenticationService.redirectUrl = this.router.url;

            // Navigate to the login page
            this.router.navigate(['/login']);
          }

          console.log('Not allowed to load page ' + route.path + ' : ' + reason);
          resolve(false);
        });
    });
  }

  private checkLogin(currentUrl: string): Promise<void> {
    return new Promise<void>( ( resolve: (value?: void) => void, reject: (reason?: any) => void) => {
      if (this._authenticationService.hasBeenAuthenticated()) {
        this._authenticationService.isSessionAlive
        .catch((reason) => {
          reject('fail to check for session : ' + reason);
        })
        .then((result: boolean) => {
          if (result) {
            resolve();
          } else {
            reject('session dead');
          }
        });
      } else {
        reject('never logged');
      }
    });
  }
}
