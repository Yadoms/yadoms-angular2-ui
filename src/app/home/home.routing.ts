import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
