import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VariantService {

  constructor(private http: HttpClient) { }

  addVariant(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addVariant', body);
  }

  getVariantsById(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getVariantById', body);
  }

  getVariants(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getVariants');
  }

  getVariantByProductId(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getVariantByProductId', body);
  }

  getVariantColour(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getVariantColours', body);
  }

  getVariantSize(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getVariantSize', body);
  }

  searchVariant(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'searchVariant', body);
  }

  addAttribute(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addAttribute', body);
  }

  updateVariant(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateVariant', body)
  }

}

/**
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VariantService {

  constructor(private http: HttpClient) { }

  addVariant(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addVariant', body);
  }

  getVariantsById(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getVariantById', body);
  }

  getVariants(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getVariants');
  }

  getVariantByProductId(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getVariantByProductId', body);
  }

  updateVariant(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateVariant', body)
  }

  getVariantColour(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getVariantColours', body);
  }

  getVariantSize(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getVariantSize', body);
  }

  searchVariant(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'searchVariant', body);
  }  

}

 */