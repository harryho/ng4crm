import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IOrder } from './order';
import { OrderService } from './order.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import {CustomerService, ICustomer} from "../customer";

@Component({
    templateUrl: './order-edit.component.html',
    styles: [`
    .example-section {
        display: flex;
        align-content: center;
        align-items: center;
        height: 60px;
        }

        .example-margin {
        margin: 0 10px;
        }
    `]
})
export class OrderEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Order Edit';
    errorMessage: string;
    orderForm: FormGroup;

    order: IOrder;
    private sub: Subscription;
    showImage:boolean;
    customers:ICustomer [];

    // Use with the generic validation messcustomerId class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private orderService: OrderService,
                private customerService: CustomerService) {

        // Defines all of the validation messcustomerIds for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            product: {
                required: 'Order first name is required.',
                minlength: 'Order first name must be at least one characters.',
                maxlength: 'Order first name cannot exceed 100 characters.'
            },
            price: {
                 range: 'Age of the order must be between 1 (lowest) and 9999 (highest).'
            },
            quantity: {
                 range: 'Age of the order must be between 1 (lowest) and 20 (highest).'
            },
            customerId: {
                range: 'Age of the order must be between 1 (lowest) and 99999 (highest).'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.orderForm = this.fb.group({
            product:['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]],
            price:['', NumberValidators.range(1, 99999)],
            quantity:['', NumberValidators.range(1, 20)],
            customerId: ['', NumberValidators.range(1, 9999999)],
            isActive: false,
        });

        // Read the order Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getOrder(id);
            }
        );

        this.getCustomers();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.orderForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.orderForm);
        });
    }

    getOrder(id: number): void {
        this.orderService.getOrder(id)
            .subscribe(
                (order: IOrder) => this.onOrderRetrieved(order),
                (error: any) => this.errorMessage = <any>error
            );
    }

    
    getCustomers() {
        this.customerService.getCustomers()
                .subscribe(customers => {
                    this.customers = customers;
                },
                error => this.errorMessage = <any>error);
    }


    onOrderRetrieved(order: IOrder): void {
        if (this.orderForm) {
            this.orderForm.reset();
        }
        this.order = order;

        if (this.order.id === 0) {
            this.pageTitle = 'Add Order';
        } else {
            this.pageTitle = `Edit Order: ${this.order.product} ${this.order.price}`;
        }

        // Update the data on the form
        this.orderForm.patchValue({
            product: this.order.product,
            price: this.order.price,
            quantity:  this.order.quantity,
            customerId: this.order.customerId,     
            isActive: this.order.isActive
        });
    }

    deleteOrder(): void {
        if (this.order.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the order: ${this.order.product}?`)) {
                this.orderService.deleteOrder(this.order.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveOrder(): void {
        if (this.orderForm.dirty && this.orderForm.valid) {
            // Copy the form values over the order object values
            let p = Object.assign({}, this.order, this.orderForm.value);

            this.orderService.saveOrder(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.orderForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.orderForm.reset();
        this.router.navigate(['/orders']);
    }
}
