import {Component, EventEmitter, ViewEncapsulation, OnInit, DoCheck, Output} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {  AuthenticationService } from '../_services';
import { Observable } from 'rxjs/Observable';
import {MaterialModule} from '@angular/material';


@Component({
    selector: 'login',
    moduleId: module.id.toString(),
    templateUrl: './login.component.html',
    styles: [`
    .login-card {
      width: 100%;
      margin: 30px;
    }
    `]
    
})

export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.authenticationService.logout();

        this.model.username = 'hho@test.com';
        this.model.password = 'password';

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ||"/dashboard" ;
    }

    login() {
        this.loading = true;

        this.authenticationService.login(this.model)
            .subscribe(
                data => {
                    console.log('login ' + this.returnUrl);
                        this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    this.loading = false;
                });
    }

}