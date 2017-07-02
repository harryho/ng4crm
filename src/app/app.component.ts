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
import { AppState } from './app.service';
import { User } from './_models'
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
// import { LoginComponent} from './login';
import { RootComponent } from './root'
import { AuthenticationService } from "./_services";
/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  // encapsulation: ViewEncapsulation.None,
  // styleUrls: [
  //   './app.component.css'
  // ],
  template: `  
   <ng-progress></ng-progress>
  <root></root>   
  `
})
export class AppComponent implements DoCheck {
  // public name = 'Reetek Angular CRM';
    // currentUser: User;

  constructor(
    public appState: AppState,
    private router: Router,
    private authService: AuthenticationService
  ) {
    // console.log('Initial App constructor  auth ' + this.authService.isAuthenticated(), this.router);

  }

  public ngOnInit() {
    // console.log('Initial App ngOnInit');

    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // if (!this.currentUser) this.currentUser = <User>{};

    // console.log('Initial App ngDoCheck ' + this.router.url + ' auth ' + this.authService.isAuthenticated());
  }

  public ngDoCheck() {



    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // if (!this.currentUser) this.currentUser = <User>{};
    // console.log('Initial App ngDoCheck ' + this.router.url + '  auth ' + this.authService.isAuthenticated());

  }

}
