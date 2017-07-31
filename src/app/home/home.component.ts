import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.service';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { SdBs2Service, SystemInformation, WsConnectionState, DiskObjectDetection, DiskObjects, DiskObject, FileContent, ReadMode } from '../core/sdbs2/sdbs2.service';
import { RestServerService } from '../core/restserver.service';
import { NavigatorService } from '../core/navigator.service';
import { Observable } from 'rxjs/Rx';
import * as $ from 'jquery';
import { TranslatePipe } from 'ng2-translate';
import 'chart.js';

@Component({
  selector: 'home',
  providers: [],
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public nseLogo: string = 'assets/img/nse.png';

  public sdcards: DiskObject[] = null;
  public pulseSdCardbutton: boolean = false;

  private sdBs2Initialized: boolean = false;

  constructor(public appState: AppState, public _authenticationService: AuthenticationService, private router: Router,
              private sdb2Service: SdBs2Service, private restServerService: RestServerService,
              public navigatorService: NavigatorService) {
  }

  public ngOnInit() {
    console.log('home component loaded');

    this.initializeSidenav();
    if (!this.sdBs2Initialized) {
      this.initializeSdBs2Service();
    }
  }

  public get loggedUserName(): string {
    return this._authenticationService.getLogin();
  }

  public onLogout() {
      this._authenticationService.signout();
      this.router.navigate(['/']);
  }

  public onSendSdCard(sd: DiskObject) {
    this.sdb2Service.readFileContent(sd.fullPath, 0, 512 * 16, ReadMode.Binary)
    .then( (fileContent: Blob) => {
      this.restServerService.post('rest/uploadinfo', fileContent)
      .then( (obj: any) => {
        console.log('############ Upload file content : success');
        console.log(obj);
      }, (uploadRejected?: any) => {
        console.warn('############ Upload file content : rejected');
        console.warn(uploadRejected);
      })
      .catch( (reason?: any) => {
        console.error('############ Upload file content : catch');
        console.error(reason);
      });
    }, (reject?: any) => {
      console.warn('############ Read file ' + sd.fullPath + ' : rejected');
      console.warn(reject);
    })
    .catch( (reason?: any) => {
      console.error('############ Read file ' + sd.fullPath + ' : catch');
      console.error(reason);
    });
  }

  /**
   * Navigate to import page
   * @param sd The sdcard file to import
   */
  public routeToImport(sd: DiskObject) {
    this.router.navigate(['import', btoa(sd.fullPath)]);
  }

  /**
   * Initialize sidenav
   */
  private initializeSidenav() {
    $('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      closeOnClick: false // force to false (if true => issue on large screen, the sidenav disappear and should not)
    });

    // fix hiding the sidenav on click (only on small devices = only if sidenav-overlay is shown)
    $('.side-nav').on('click', () => {
      if ($('sidenav-overlay' ) !== null) {
        $('.button-collapse').sideNav('hide');
      }
    });
  }

  private setSdCards(allObj: DiskObject[]) {
    this.sdcards = [];
    if (allObj) {
      this.sdcards = allObj;
      this.pulseSdCardbutton = true;
      Observable.of(this.sdcards).delay(5000).toPromise().then(() => {
          this.pulseSdCardbutton = false;
      });
      /*allObj.forEach( (o: DiskObject) => {
        this.sdcards.push(new ExDiskObject(o));
      });*/
    }
  }

  private initializeSdBs2Service() {
    if (!this.navigatorService.isMobileNavigator()) {

      const lastCnxState = this.sdb2Service.getLastConnectionState();
      if (!lastCnxState || (lastCnxState && lastCnxState.result)) {
        this.sdb2Service.onConnectStateChange.subscribe( (state: WsConnectionState) => {
          console.debug('onConnectStateChange : ' + state.result + (state.result ? '' : 'Code=' + state.code + ' :' + state.reason) );
          if (state.result) {
            this.sdb2Service.askSystemInformation()
            .then( (msg: SystemInformation) => {
              console.log('System version : ' + msg.version);
              console.log('System os : ' + msg.os);
              console.log('System path : ' + msg.path);
              console.log('System startupTime : ' + msg.startupTime);
            }).catch(console.log);

            this.sdb2Service.searchBs2SdCard()
            .then( (results: DiskObjects) => {
              this.setSdCards(results.result);
            });
          }
        });

        this.sdb2Service.onUnsolicitedUnknownMessage.subscribe( (msg: any) => {
          console.warn('Unknown message :' + JSON.stringify(msg));
        });

        this.sdb2Service.onUnsolicitedDriveDetection.subscribe( (msg: DiskObjectDetection) => {
          if (msg.inserted) {
              this.sdb2Service.searchBs2SdCardOnDrive(msg.name)
              .then( (results: DiskObjects) => {
                this.setSdCards(results.result);
              });
          } else {
              this.sdb2Service.searchBs2SdCard()
              .then( (results: DiskObjects) => {
                this.setSdCards(results.result);
              });
          }
        });

        this.sdb2Service.startWebSocketConnection();
      } else {
        console.warn('websocket already connected (navigator back action?');
      }
      this.sdBs2Initialized = true;
    } else {
      // for mobile/tablet device the sdcard management is disabled
    }
  }
}
