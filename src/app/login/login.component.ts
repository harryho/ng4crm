import { Component,   ViewEncapsulation, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {  AuthenticationService } from '../_services';
import { Observable } from 'rxjs/Observable';
import {MaterialModule} from '@angular/material';

@Component({
    selector: 'login',
    moduleId: module.id.toString(),
    // encapsulation: ViewEncapsulation.None,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService//) {}
        // private alertService: AlertService,
) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        this.model.username = 'hho@test.com';
        this.model.password = 'password';
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log(this.returnUrl)

        // this.router.navigate(['/']);
    }

    login() {
        this.loading = true;

        this.authenticationService.login(this.model)
            .subscribe(
                data => {
                    console.log(this.route)
                    this.router.navigate(['/']);
                    // this.router.navigate([this.returnUrl]);
                },
                error => {
                    // this.alertService.error(error);
                    console.log(error);
                    this.loading = false;
                });
    }

    public ngOnChecks(){

         console.log(this.router.navigated )

    }

    // private handleError(error: Response) {
    //     console.error(error);
    //     return Observable.throw(error.json().error || 'Server error');
    // }
}