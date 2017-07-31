import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SdBs2Service } from './sdbs2/sdbs2.service';
import { WebSocketService } from './websocket.service';
import { DataService } from './data.service';
import { WebSocketDataService } from './websocket-data.service';
import { RestServerService } from './restserver.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthGuardService } from './authentication/auth-guard.service';
import { ErrorService } from './error.service';
import { UserService } from './user.service';
import { AircraftService } from './aircraft.service';
import { OperatingbasesService } from './operatingbases.service';
import { OperatingService } from './operating.service';
import { OperatingResolver } from './operating.resolver.service';
import { SdCardInfoResolver } from './sdcardinfo.resolver.service';
import { UploadService } from './upload.service';
import { NavigatorService } from './navigator.service';
import { SdCardService } from './sdcard.service';
import { ConfigurationService } from './configuration.service';
import { SummaryService } from './summary.service';

@NgModule({
  imports:      [ CommonModule ],
  providers: [  WebSocketService, RestServerService, AuthenticationService,
                ErrorService, AuthGuardService, UserService, OperatingbasesService, OperatingService,
                AircraftService, OperatingResolver, UploadService, SdCardInfoResolver, NavigatorService,
                SdCardService, ConfigurationService, SummaryService ]
})
export class CoreModule {
    public static forRoot(providedLoader?: any): ModuleWithProviders {
      return { ngModule: CoreModule, providers: [SdBs2Service] };
    }
}
