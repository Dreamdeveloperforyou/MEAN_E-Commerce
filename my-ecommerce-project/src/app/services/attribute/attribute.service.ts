import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient) { }

  addAttribute(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addAttribute', body);
  }

  getAttributeByVariantId(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getAttributeByVariantId', body);
  }

  getAttributeById(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getAttributeById', body);
  }

  updateAttribute(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateAttribute', body);
  }
}
