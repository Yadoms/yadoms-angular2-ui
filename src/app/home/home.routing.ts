import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageComponent } from './dashboard/page.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'page/first' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'page/first', component: PageComponent },
      { path: 'page/:id', component: PageComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
