import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgProgressModule, NgProgressBrowserXhr, NgProgressService } from 'ngx-progressbar';


import { OrderListComponent } from './order-list.component';
import { OrderDetailComponent } from './order-detail.component';
import { OrderDetailGuard, OrderEditGuard } from './order-guard.service';
import { OrderEditComponent } from './order-edit.component';

import { OrderService } from './order.service';

import { SharedModule } from '../shared/shared.module';
import {MaterialModule} from '@angular/material';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    NgProgressModule,
    // InMemoryWebApiModule.forRoot(OrderData),
    RouterModule.forChild([
      { path: 'orders', component: OrderListComponent },
      { path: 'order/:id',
        canActivate: [ OrderDetailGuard],
        component: OrderDetailComponent
      },
      { path: 'orderEdit/:id',
        canDeactivate: [ OrderEditGuard ],
        component: OrderEditComponent },
    ])
  ],
  declarations: [
        /**
     * Components / Directives/ Pipes
     */
    OrderListComponent,
    OrderDetailComponent,
    OrderEditComponent
  ],
  providers: [
    OrderService,
    OrderDetailGuard,
    OrderEditGuard
    
  ]
})
export class OrderModule {}
