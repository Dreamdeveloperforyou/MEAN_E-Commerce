import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { response } from '../../interface/interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  signUp(body: object): Observable<response> {
    return this.http.post<response>(environment.baseUrl + 'sign-up', body);
  }

  quickSignup(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'quickSignup', body);
  }


  // ipToUserID(body: object): Observable<response> {
  //   return this.http.post<response>(environment.baseUrl + 'ipToUserID', body);
  // }

  login(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'login', body);
  }
}