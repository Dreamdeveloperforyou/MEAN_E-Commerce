import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'add-category', body);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getCategories');
  }

  getCategoryTree(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getCategoryTree');
  }

  getSubCategories(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getSubCategories');
  }


  getCategoryById(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getCategoriesById', body);
  }

  getCategory(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getCategories');
  }

  CategoryById(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'categoryById', body);
  }


  updateCategory(body:any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateCategory', body);
  }

  updateSubCategory(body:any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateSubCategory', body);
  }
}
