import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { PagerService } from '../_services';
import { ConfirmDialog } from '../shared';
import * as _ from 'lodash';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';


@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ ConfirmDialog]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Products';
    imcustomerIdWidth: number = 30;
    imcustomerIdMargin: number = 2;
    showImage: boolean = false;
    listFilter: any = {};
    errorMessage: string;

    products: IProduct[];
    pager: any = {};
    pagedItems: any[];
    searchFilter: any = {};
    selectedOption: string;

    public title: string = 'Popover title';
    public message: string = 'Popover description';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;

    constructor(private productService: ProductService,
        private pagerService: PagerService, public dialog: MdDialog, public snackBar: MdSnackBar) {
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProducts()
            .subscribe(products => {
                this.products = products;                
                this.setPage(1);
            },
            error => this.errorMessage = <any>error);

        this.searchFilter = {};
        this.listFilter = {};
    }

    getProducts(pageNum? : number) {
        this.productService.getProducts()
                .subscribe(products => {
                    this.products = products;
                    this.setPage(pageNum||1);
                },
                error => this.errorMessage = <any>error);
    }

    setPage(page: number) {
        if (page < 1 || (this.pager.totalPages > 0 && page > this.pager.totalPages)) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.products.length, page, 5);

        // get current page of items
        this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    searchProducts(filters: any) {
        if (filters) {
            this.productService.getProducts()
                .subscribe(products => {
                    this.products = products;
                    console.log(this.products.length)
                    this.products = this.products.filter((product: IProduct) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                                product[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                        })
                        return match;
                    });
                    this.setPage(1);
                },
                error => this.errorMessage = <any>error);
        }

    }

    resetListFilter() {
        this.listFilter = {};
        this.getProducts();
    }

     reset() {
       this.listFilter = {};
        this.searchFilter = {};

        this.getProducts();
    }

    resetSearchFilter(searchPanel: any) {
        searchPanel.toggle();
        this.searchFilter = {};

        this.getProducts();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 1500,
        });
    }

    openDialog(id: number) {
        let dialogRef = this.dialog.open(ConfirmDialog,
            { data: { title: 'Dialog', message: 'Are sure to delete this item?' } });
        dialogRef.disableClose = true;


        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;

            if (this.selectedOption === dialogRef.componentInstance.ACTION_CONFIRM) {
                this.productService.deleteProduct(id).subscribe(
                    () => {
                        this.productService.getProducts()
                            .subscribe(products => {
                                this.products = products;
                                this.setPage(1);
                            },
                            error => this.errorMessage = <any>error);
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        console.log(this.errorMessage);
                        this.openSnackBar("This item has not been deleted successfully. Please try again.", "Close");
                    }
                );
            }
        });
    }



}
