import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgProgressModule, NgProgressBrowserXhr, NgProgressService } from 'ngx-progressbar';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';
import { ProductEditComponent } from './product-edit.component';

import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import {MaterialModule} from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    NgProgressModule,
    // InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id',
        canActivate: [ ProductDetailGuard],
        component: ProductDetailComponent
      },
      { path: 'productEdit/:id',
        canDeactivate: [ ProductEditGuard ],
        component: ProductEditComponent },
    ])
  ],
  declarations: [
        /**
     * Components / Directives/ Pipes
     */
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
  ],
  providers: [
    ProductService,
    ProductDetailGuard,
    ProductEditGuard
    
  ]
})
export class ProductModule {}
