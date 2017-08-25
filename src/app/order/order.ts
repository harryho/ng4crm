/* Defines the order entity */
import {ICustomer} from '../customer';
import {IProduct} from '../product';

export interface IOrder {
    id: number;
    avatar : string;
    reference: string;
    amount: number;
    quantity: number;
    customerId: number;
    isActive: boolean;
    orderDate: any;
    shippedDate: any;
    customer: ICustomer;
    products: Array<IProduct>;
    shipAddress: IAddress;
}

export interface IAddress {
    address: string;
    city: string;
    country: string;
    zipcode: string;
}
