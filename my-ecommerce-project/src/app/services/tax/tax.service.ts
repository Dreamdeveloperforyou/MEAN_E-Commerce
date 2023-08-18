import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private http: HttpClient) { }

  addTax(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addTax', body);
  }

  getTax(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getTax');
  }

  addAssignTax(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addAssignTax', body);
  }
}
