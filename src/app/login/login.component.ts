
import { Component } from '@angular/core';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { AuthenticationResult } from '../core/authentication/authentication.result';
import { Router } from '@angular/router';
import { TranslateService, TranslatePipe } from 'ng2-translate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public message: string;
    public userLogin: string;
    public userPassword: string;
    public loading: boolean = false;

    constructor(private authenticationService: AuthenticationService, private router: Router, private translate: TranslateService) {
    }

    public tryToLog() {
        this.loading = true;
        this.authenticationService.tryAuthenticate(this.userLogin, this.userPassword)
        .then( (result: AuthenticationResult) => {
            if (result.authenticated) {
                this.translate.get('login.welcome', { name : this.userLogin }).subscribe((welcomeMessage: string) => {
                    Materialize.toast(welcomeMessage, 2000, 'green darken2');
                });
                this.router.navigate(['/home']);
            } else {
                if (typeof result.errorInfo === 'string') {
                    Materialize.toast(result.errorInfo, 5000, 'red darken2');
                } else {
                    Materialize.toast(result.errorInfo.message, 5000, 'red darken2');
                }
            }
            this.loading = false;
        })
        .catch( (reason: any) => {
            this.loading = false;
            Materialize.toast(reason, 5000, 'red darken2');
        });
    }
}
