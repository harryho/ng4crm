/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  OnChanges,
  Input,
  // ViewEncapsulation,
  DoCheck
} from '@angular/core';
import { AppState } from '../app.service';
import { User } from '../_models'
import { Router , ActivatedRoute } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { AuthenticationService } from "../_services";

/**
 * App Component
 * Entry Component
 */
@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: [
    './root.component.css'
  ],
})
export class RootComponent implements OnInit {
  public name = 'Reetek Angular CRM';

  currentUser: User;

  constructor(
    public appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService ) {}

  public ngOnInit() {
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'))||<User>{};
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);    
  }

}

