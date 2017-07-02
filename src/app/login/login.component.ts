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
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        this.model.username = 'hho@test.com';
        this.model.password = 'password';

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // this.returnUrl = this.returnUrl === "/"?"dashboard":this.returnUrl;     

        console.log(this.returnUrl)
    }

    login() {
        this.loading = true;

        this.authenticationService.login(this.model)
            .subscribe(
                data => {
                    console.log(this.route)
                    // this.router.navigate(['/']);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
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