import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { products, response } from '../../interface/interface';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(body: object): Observable<response> {
    return this.http.post<response>(environment.baseUrl + 'add-product', body);
  }

  getProducts(): Observable<products> {
    return this.http.get<products>(environment.baseUrl + 'display-product');
  }

  deleteProducts(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'delete-product?id=' + body);
  }

  addCategory(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'add-category', body);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getCategories');
  }

  getSubCategories(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getSubCategories');
  }


  getCategoryById(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getCategoriesById', body);
  }

  getProductByCatId(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getProductByCatId', body);
  }

  makePayment(stripeToken: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'payment', stripeToken);
  }

  addShippingAddress(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addShippingAddress', body);
  }


  getShippingAddress(body: object): Observable<products> {
    return this.http.post<products>(environment.baseUrl + 'getShippingAddress', body);
  }

  getProductByProductId(body: object): Observable<products> {
    return this.http.post<products>(environment.baseUrl + 'getProductByProductId', body);
  }

  updateProducts(body: object): Observable<products> {
    return this.http.post<products>(environment.baseUrl + 'updateProduct', body);
  }
}

