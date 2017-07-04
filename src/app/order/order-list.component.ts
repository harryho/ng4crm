import { Component, OnInit } from '@angular/core';

import { IOrder } from './order';
import { OrderService } from './order.service';
import { PagerService } from '../_services';
import { ConfirmDialog } from '../shared';
import * as _ from 'lodash';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';


@Component({
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css'],
    providers: [ ConfirmDialog]
})
export class OrderListComponent implements OnInit {
    pageTitle: string = 'Orders';
    imcustomerIdWidth: number = 30;
    imcustomerIdMargin: number = 2;
    showImage: boolean = false;
    listFilter: any = {};
    errorMessage: string;

    orders: IOrder[];
    pager: any = {};
    pagedItems: any[];
    searchFilter: any = {};
    selectedOption: string;

    public title: string = 'Popover title';
    public message: string = 'Popover description';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;

    constructor(private orderService: OrderService,
        private pagerService: PagerService, public dialog: MdDialog, public snackBar: MdSnackBar) {
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.orderService.getOrders()
            .subscribe(orders => {
                this.orders = orders;                
                this.setPage(1);
            },
            error => this.errorMessage = <any>error);

        this.searchFilter = {};
        this.listFilter = {};
    }

    getOrders(pageNum? : number) {
        this.orderService.getOrders()
                .subscribe(orders => {
                    this.orders = orders;
                    this.setPage(pageNum||1);
                },
                error => this.errorMessage = <any>error);
    }

    setPage(page: number) {
        if (page < 1 || (this.pager.totalPages > 0 && page > this.pager.totalPages)) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.orders.length, page, 5);

        // get current page of items
        this.pagedItems = this.orders.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    searchOrders(filters: any) {
        if (filters) {
            this.orderService.getOrders()
                .subscribe(orders => {
                    this.orders = orders;
                    console.log(this.orders.length)
                    this.orders = this.orders.filter((order: IOrder) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                                order[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
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
        this.getOrders();
    }

     reset() {
       this.listFilter = {};
        this.searchFilter = {};

        this.getOrders();
    }

    resetSearchFilter(searchPanel: any) {
        searchPanel.toggle();
        this.searchFilter = {};

        this.getOrders();
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
                this.orderService.deleteOrder(id).subscribe(
                    () => {
                        this.orderService.getOrders()
                            .subscribe(orders => {
                                this.orders = orders;
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
