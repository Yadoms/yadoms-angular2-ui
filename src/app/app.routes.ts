import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { CheckServerComponent } from './check/check-server.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './core/authentication/auth-guard.service';

export const ROUTES: Routes = [
  { path: '',      component: CheckServerComponent },
  { path: 'check', component: CheckServerComponent},
  { path: 'home', loadChildren: './home/home.module#HomeModule', canLoad: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '**',    component: NoContentComponent },
];
