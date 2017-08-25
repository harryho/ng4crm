import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;
    private sub: Subscription;
       imcustomerIdWidth: number = 80;
    imcustomerIdMargin: number = 2;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getProduct(id: number) {
        this.productService.getProduct(id).subscribe(
            product =>  this.product = product,
                //  this.product.avatar = this.product.avatar?`/assets/${this.product.avatar}`:this.product.avatar; },
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/products']);
    }

    onRatingClicked(messcustomerId: string): void {
        this.pageTitle = 'Product Detail: ' + messcustomerId;
    }
}
