import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {

  constructor(private http: HttpClient) { }

  addShippingAddress(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addShippingAddress', body);
  }

  getShippingAddress(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getShippingAddress', body);
  }

  updateShippingAddress(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateShippingAddress', body);
  }

  getShippingAddressById(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getShippingAddressById', body);
  }

  deleteShippingAddress(body: object): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'deleteShippingAddress?_id=' + body);
  }
  
  setDefaultShippingAddress(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'setDefaultShippingAddress', body);
  }

  getdefaultAddress(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getdefaultAddress', body);
  }
  
}