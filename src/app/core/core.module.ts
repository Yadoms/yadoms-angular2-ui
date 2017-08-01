import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from './websocket.service';
import { RestServerService } from './restserver.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthGuardService } from './authentication/auth-guard.service';
import { ErrorService } from './error.service';
import { NavigatorService } from './navigator.service';

@NgModule({
  imports:      [ CommonModule ],
  providers: [  WebSocketService, RestServerService, AuthenticationService,
                ErrorService, AuthGuardService, NavigatorService ]
})
export class CoreModule {
    public static forRoot(providedLoader?: any): ModuleWithProviders {
      return { ngModule: CoreModule, providers: [] };
    }
}
