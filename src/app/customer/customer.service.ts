import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BackendService } from '../_services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ICustomer } from './customer';

@Injectable()
export class CustomerService {
    private baseUrl = 'customers';

    constructor(private http: Http, private backend: BackendService) { }

    getCustomers(): Observable<ICustomer[]> {
        // return this.http.get(this.baseUrl)
        return this.backend.getAll(this.baseUrl)
            .map(this.extractData)
            // .do(data => console.log('getCustomers: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getCustomer(id: number): Observable<ICustomer> {
        if (id === 0) {
            return Observable.of(this.initializeCustomer());
            // return Observable.create((observer: any) => {
            //     observer.next(this.initializeCustomer());
            //     observer.complete();
            // });
        };
        // const url = `${this.baseUrl}/${id}`;
        return this.backend.getById( this.baseUrl, id)
            .map(this.extractData)
            .do(data => console.log('getCustomer: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteCustomer(id: number): Observable<Response> {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.backend.delete(this.baseUrl, id)
            // .do(data => console.log('deleteCustomer: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveCustomer(customer: ICustomer): Observable<ICustomer> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (customer.id === 0) {
            return this.createCustomer(customer, options);
        }
        return this.updateCustomer(customer, options);
    }

    private createCustomer(customer: ICustomer, options: RequestOptions): Observable<ICustomer> {
        customer.id = undefined;
        return this.backend.create(this.baseUrl, customer)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private updateCustomer(customer: ICustomer, options: RequestOptions): Observable<ICustomer> {
        // const url = `customers/${customer.id}`;
        return this.backend.update(this.baseUrl, customer)
            .map(() => customer)
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json ? response.json() : response;
        return body.data ? body.data : (body || {});
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeCustomer(): ICustomer {
        // Return an initialized object
        return {
            id: 0,
            avatar: null,
            firstName: null,
            lastName: null,
            age: 0,
            email: null,
            isActive: false,
        };
    }
}
