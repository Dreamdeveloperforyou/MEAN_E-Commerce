import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {

  constructor(private http: HttpClient) { }

  savePromocode(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'savePromocode', body);
  }

  getPromocodes(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getPromocodes');
  }

  assignPromocode(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'assignPromocode', body);
  }

  applyPromocode(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'applyPromocode', body);
  }

  deletePromocode(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'deletePromocode?_id=' + body);
  }
}