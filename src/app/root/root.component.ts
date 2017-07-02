/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  DoCheck
} from '@angular/core';
import { AppState } from '../app.service';
import { User } from '../_models'
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { AuthenticationService } from "../_services";
// import { LoginComponent} from './login';
// import { DashboardComponent } from '../dashboard'
/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: [
    './root.component.css'
  ],
})
export class RootComponent implements  DoCheck { 
  public name = 'Reetek Angular CRM';

  currentUser: User;
  showDashboard: boolean;

  constructor(
    public appState: AppState,
    private router: Router,
    private authService: AuthenticationService ) {


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));     
    if (!this.currentUser) this.currentUser = <User>{};
    this.showDashboard = this.router.url === '/';

  }

  public ngOnInit() {
    // console.log('ngOnInit');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.showDashboard = this.router.url === '/'
  }

  logout(): void {
    this.currentUser.isAuthenticated = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);    
  }

  navigate(url: string): void {
    this.router.navigate([url]);
  }

  public ngDoCheck() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       this.showDashboard = this.router.url === '/';
      if (!this.currentUser) this.currentUser = <User>{};
  }

}

