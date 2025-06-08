import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  access_token: string;
  role: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('token'));
  public token$ = this.tokenSubject.asObservable();

  private sessionStatusSubject = new BehaviorSubject<boolean>(this.tokenSubject.value !== null);
  public sessionStatus$ = this.sessionStatusSubject.asObservable();

  private api = 'https://asf-back-by73.onrender.com/';

  constructor(private http: HttpClient) {}

  login(mail: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.api}auth/login`, { mail, password })
      .pipe(
        tap((response) => {
          this.tokenSubject.next(response.access_token);
          sessionStorage.setItem('token', response.access_token);
          sessionStorage.setItem('role', response.role);
          sessionStorage.setItem('nombre', response.nombre);

          this.updateSessionStatus(true);
        }),
        catchError((error) => {
          this.updateSessionStatus(false);
          return throwError(() => error);
        })
      );
  }

  updateSessionStatus(status: boolean): void {
    this.sessionStatusSubject.next(status);
  }

  logout(): void {
    this.tokenSubject.next(null);
    this.updateSessionStatus(false);
    sessionStorage.clear();
  }

  getToken(): string | null {
    return this.tokenSubject.getValue();
  }

  isLoggedIn(): boolean {
    return this.tokenSubject.getValue() !== null;
  }
}
