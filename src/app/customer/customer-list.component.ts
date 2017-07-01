import { Component, OnInit } from '@angular/core';

import { ICustomer } from './customer';
import { CustomerService } from './customer.service';
import { PagerService } from '../_services';
import { ConfirmDialog } from '../shared';
import * as _ from 'lodash';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';


@Component({
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css'],
    providers: [ ConfirmDialog]
})
export class CustomerListComponent implements OnInit {
    pageTitle: string = 'Customers';
    imageWidth: number = 30;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: any = {};
    errorMessage: string;

    customers: ICustomer[];
    pager: any = {};
    pagedItems: any[];
    searchFilter: any = {};
    selectedOption: string;

    public title: string = 'Popover title';
    public message: string = 'Popover description';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;

    constructor(private customerService: CustomerService,
        private pagerService: PagerService, public dialog: MdDialog, public snackBar: MdSnackBar) {
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.customerService.getCustomers()
            .subscribe(customers => {
                this.customers = customers;                
                this.setPage(1);
            },
            error => this.errorMessage = <any>error);

        this.searchFilter = {};
        this.listFilter = {};
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Customer List: ' + message;
    }

    setPage(page: number) {
        if (page < 1 || (this.pager.totalPages > 0 && page > this.pager.totalPages)) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.customers.length, page, 5);

        // get current page of items
        this.pagedItems = this.customers.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    searchCustomers(filters: any) {
        if (filters) {
            this.customerService.getCustomers()
                .subscribe(customers => {
                    this.customers = customers;
                    console.log(this.customers.length)
                    this.customers = this.customers.filter((customer: ICustomer) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                                customer[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                        })
                        // console.log(match, customer);
                        return match;
                    });

                    // console.log(this.customers.length);
                    this.setPage(1);
                },
                error => this.errorMessage = <any>error);
        }

    }

    resetListFilter() {
        this.listFilter = {};
        this.customerService.getCustomers()
            .subscribe(customers => {
                this.customers = customers;
                this.setPage(1);
            },
            error => this.errorMessage = <any>error);
    }

     reset() {
       this.listFilter = {};
        this.searchFilter = {};

        this.customerService.getCustomers()
            .subscribe(customers => {
                this.customers = customers;
                this.setPage(1);
            },
            error => this.errorMessage = <any>error);
    }

    resetSearchFilter(searchPanel: any) {
        searchPanel.toggle();
        this.searchFilter = {};

        this.customerService.getCustomers()
            .subscribe(customers => {
                this.customers = customers;
                
                this.setPage(1);
            },
            error => this.errorMessage = <any>error);
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
                this.customerService.deleteCustomer(id).subscribe(
                    () => {
                        this.customerService.getCustomers()
                            .subscribe(customers => {
                                this.customers = customers;
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
