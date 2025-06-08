import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const APIURL = 'https://asf-back-by73.onrender.com/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUsuario(usuario: any): Observable<any> {
    return this.http.post(APIURL, usuario);
  }
}
