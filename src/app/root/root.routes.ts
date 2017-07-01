import { AboutComponent } from '../about';
import { LoginComponent } from '../login';
// import { HomeComponent } from '../home';
import { LogoutComponent } from '../logout';
import { ErrorPageComponent } from '../errorpage';
 import { RootComponent } from './root.component';
import { CustomerListComponent } from '../customer';
import { AuthGuard } from '../_guard';
// import { ErrorPageComponent } from './errorpage';

export const routes = [
  { path: '',   children: [

  { path: 'dashboard',  redirectTo: ''},
  { path: 'about', component: AboutComponent },

  { path: 'customer', component: CustomerListComponent},

  ]},
];
