import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  currentUserRole: any

  constructor(private router: Router) { }

  canActivate(): boolean {
    this.currentUserRole = localStorage.getItem('role');
    if (this.currentUserRole == 0) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
  
}
