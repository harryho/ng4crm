/* Defines the order entity */
import {ICustomer} from '../customer';

export interface IOrder {
    id: number;
    avatar : string;
    product: string;
    price: number;
    quantity: number;
    customerId: number;
    isActive: boolean;
    customer: ICustomer;
}
