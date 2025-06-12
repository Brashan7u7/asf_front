import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  img_portada: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewService {
  private api = 'https://asf-back-by73.onrender.com/noticia';
  constructor(private http: HttpClient) {}

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.api);
  }

  postNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(this.api, noticia);
  }
}
