
import { Component, OnInit } from '@angular/core';
import { RestServerService } from '../core/restserver.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-check-server',
  templateUrl: './check-server.component.html',
  styleUrls: ['./check-server.component.css']
})
export class CheckServerComponent implements OnInit {
    public loading: boolean = false;
    public hasFailed: boolean = false;

    constructor(private restserverService: RestServerService, private router: Router) {
    }

    public ngOnInit() {
      this.checkServerIsAlive();
    }

    public checkServerIsAlive(): void {
        console.log('Check for server is alive');
        this.loading = true;
        try {
            this.restserverService.isAlive()
            .then( (result: boolean) => {
                console.log('Check for server is alive : result : ' + result);
                if (result === true) {
                    this.router.navigate(['home']);
                } else {
                    this.hasFailed = true;
                }
                this.loading = false;
            })
            .catch( (e1) => {
                // allow one retry (after server reboot, always pass here)
                this.restserverService.isAlive()
                .then( (result: boolean) => {
                    console.log('Check for server is alive : result : ' + result);
                    if (result === true) {
                        this.router.navigate(['home']);
                    } else {
                        this.hasFailed = true;
                    }
                    this.loading = false;
                })
                .catch( (e2) => {
                    console.warn(e1);
                    console.warn(e2);
                    console.warn('Fail to check for server is alive : ' + e2);
                    this.hasFailed = true;
                    this.loading = false;
                });
            });
        } catch (error) {
            console.error('checkServerIsAlive : error : ' + error);
            this.hasFailed = true;
            this.loading = false;
        }
    }
}
