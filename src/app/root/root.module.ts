import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import {NgProgressModule, NgProgressBrowserXhr, NgProgressService } from 'ngx-progressbar';

import { routes } from './root.routes';
import { AboutComponent } from '../about';

console.log('`Barrel` bundle loaded asynchronously');

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class RootModule {
  public static routes = routes;
}
