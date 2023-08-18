import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  saveOrder(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'saveOrder', body);
  }

  getOrder(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getOrder', body);
  }
  
}