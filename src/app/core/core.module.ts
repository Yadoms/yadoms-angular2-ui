import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from './websocket.service';
import { RestServerService } from './restserver.service';
import { ErrorService } from './error.service';
import { NavigatorService } from './navigator.service';
import { PageService } from './pages.service';

@NgModule({
  imports:      [ CommonModule ],
  providers: [  WebSocketService, RestServerService, ErrorService, NavigatorService, PageService ]
})
export class CoreModule {
    public static forRoot(providedLoader?: any): ModuleWithProviders {
      return { ngModule: CoreModule, providers: [] };
    }
}