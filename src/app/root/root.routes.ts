import { AboutComponent } from '../about';
// import { LoginComponent } from '../login';
// import { HomeComponent } from '../home';
import { DashboardComponent } from '../dashboard';
// import { ErrorPageComponent } from '../errorpage';
//  import { RootComponent } from './root.component';
import { CustomerListComponent } from '../customer';
import { AuthGuard } from '../_guard';
// import { ErrorPageComponent } from './errorpage';

export const routes = [
  { path: '', children: [
  { path: 'dashboard', redirectTo: ''},//  component: DashboardComponent},
  { path: 'about', component: AboutComponent },
  { path: 'customer', component: CustomerListComponent},
  ]},
];
