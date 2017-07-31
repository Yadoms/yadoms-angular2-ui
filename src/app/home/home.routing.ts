import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsageComponent } from './usage/usage.component';
import { OperatingDisplayComponent } from './usage/operating.display.component';
import { AuthGuardService } from '../core/authentication/auth-guard.service';
import { OperatingResolver } from '../core/operating.resolver.service';
import { SdCardInfoResolver } from '../core/sdcardinfo.resolver.service';
import { ImportComponent } from './import/import.component';
import { UploadComponent } from './import/upload.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'usage', component: UsageComponent},
      { path: 'usage/:ertId', component: OperatingDisplayComponent, resolve: { operating: OperatingResolver}},
      { path: 'import', component: ImportComponent},
      { path: 'importfile', component: UploadComponent, resolve: { sdCardInfo: SdCardInfoResolver}},
      { path: 'configurefile', component: ConfigurationComponent, resolve: { sdCardInfo: SdCardInfoResolver}},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
