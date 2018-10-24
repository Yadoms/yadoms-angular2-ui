import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPageHeaderComponent} from './admin-page-header/admin-page-header.component';

import {SystemComponent} from './system/system.component';
import {PluginsComponent} from './plugins/plugins.component';
import {DevicesComponent} from './devices/devices.component';
import {AutomationComponent} from './automation/automation.component';
import {RecipientsComponent} from './recipients/recipients.component';
import {UpdateComponent} from './update/update.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {AboutComponent} from './about/about.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminPageHeaderComponent, SystemComponent, PluginsComponent, DevicesComponent,
    AutomationComponent, RecipientsComponent, UpdateComponent, MaintenanceComponent, AboutComponent]
})
export class AdministrationModule {
}
