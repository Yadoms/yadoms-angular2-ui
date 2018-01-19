import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PageComponent } from './page/page.component';
import { SystemComponent } from './administration/system/system.component';
import { PluginsComponent } from './administration/plugins/plugins.component';
import { DevicesComponent } from './administration/devices/devices.component';
import { AutomationComponent } from './administration/automation/automation.component';
import { RecipientsComponent } from './administration/recipients/recipients.component';
import { UpdateComponent } from './administration/update/update.component';
import { MaintenanceComponent } from './administration/maintenance/maintenance.component';
import { AboutComponent } from './administration/about/about.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'page/first' },
      { path: 'dashboard', redirectTo: 'page/first' },
      { path: 'page/first', component: PageComponent },
      { path: 'page/:id', component: PageComponent },
      { path: 'administration/system', component: SystemComponent },
      { path: 'administration/plugins', component: PluginsComponent },
      { path: 'administration/devices', component: DevicesComponent },
      { path: 'administration/automation', component: AutomationComponent },
      { path: 'administration/recipients', component: RecipientsComponent },
      { path: 'administration/update', component: UpdateComponent },
      { path: 'administration/maintenance', component: MaintenanceComponent },
      { path: 'administration/about', component: AboutComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
