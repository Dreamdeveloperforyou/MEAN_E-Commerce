import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCart(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addToCart', body)
  }


  getCart(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getCart', body)
  }


  increaseCart(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'increaseCart', body)
  }


  decreaseCart(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'decreaseCart', body)
  }


  removeCart(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'removeCart',body)
  }
}
