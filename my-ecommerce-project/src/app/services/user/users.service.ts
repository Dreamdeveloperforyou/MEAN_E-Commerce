import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateProfile(body:object):Observable<any>{
    return this.http.post<any>(environment.baseUrl+ 'updateProfile' , body)
  }

   
  ipToUserID(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'ipToUser', body);
  }

  getProfile(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getProfile', body)
  }
    getAllUser(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getAllUser')
  }

}
