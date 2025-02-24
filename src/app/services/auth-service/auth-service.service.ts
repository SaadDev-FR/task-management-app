import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.getAuthStatus());
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private apiUrl = 'http://localhost:3000/users';
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {

            this.isAuthenticated = true;
            localStorage.setItem('auth', JSON.stringify(this.isAuthenticated));
            this.isAuthenticatedSubject.next(true);
            return true;
          }
          return false;
        })
      );
  }

  private getAuthStatus(): boolean {
    return JSON.parse(localStorage.getItem('auth') || 'false');
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('auth');
    localStorage.clear();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('auth');
  }
}
