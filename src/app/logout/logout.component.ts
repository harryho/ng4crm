import { Component,   ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  AuthenticationService } from '../_services';
// import { Observable } from 'rxjs/Observable';
// import {MaterialModule} from '@angular/material';

@Component({
    selector: 'logout',
    moduleId: module.id.toString(),
    encapsulation: ViewEncapsulation.None,
    template: `
    <div>
 Logging out ...  
</div>`
})

export class LogoutComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();
         this.router.navigate(['login']);
    }    
}