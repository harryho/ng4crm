import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ErrorPageComponent } from './errorpage';

import { CustomerListComponent } from './customer';
import { LogoutComponent } from './logout';
import { RootComponent } from './root';
import { LoginComponent } from './login';
// import { DataResolver } from './app.resolver';
import { AuthGuard } from './_guard';

export const ROUTES: Routes = [  
  { path: '', component: RootComponent}, 
  { path: 'login', redirectTo:''}, 
  { path: '**',    component: ErrorPageComponent, canActivate: [AuthGuard]},
];
