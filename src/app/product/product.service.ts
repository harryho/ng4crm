import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BackendService } from '../_services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProduct } from './product';

@Injectable()
export class ProductService {
    private baseUrl = 'products';

    constructor(private http: Http, private backend: BackendService) { }

    getProducts(): Observable<IProduct[]> {
        // return this.http.get(this.baseUrl)
        const url = `${this.baseUrl}?_expand=category`;
        return this.backend.getAll(url)
            .map(this.extractData)
            // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<IProduct> {
        if (id === 0) {
            return Observable.of(this.initializeProduct());
            // return Observable.create((observer: any) => {
            //     observer.next(this.initializeProduct());
            //     observer.complete();
            // });
        };
        const url = `${this.baseUrl}/${id}/?_expand=category`;
        return this.backend.getById( url, id)
            .map(this.extractData)
            .do(data => console.log('getProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteProduct(id: number): Observable<Response> {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.backend.delete(url, id)
            // .do(data => console.log('deleteProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (product.id === 0) {
            return this.createProduct(product, options);
        }
        return this.updateProduct(product, options);
    }

    private createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        product.id = undefined;
        return this.backend.create(this.baseUrl, product)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        // const url = `products/${product.id}`;
        return this.backend.update(this.baseUrl, product)
            .map(() => product)
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

    initializeProduct(): IProduct {
        // Return an initialized object
        return {
            id: 0,
            avatar: null,
            categoryId: 0,
            productName: null,
            unitPrice: 0,
            // customerId: 0,
            unitInStock: 0,
            // isActive: false,
            // customer: null,
        };
    }
}
