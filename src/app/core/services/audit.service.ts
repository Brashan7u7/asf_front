import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Auditoria {
  id: number;
  nombre: string;
  tipo: string;
  fecha: string;
  entidad: string;
  estatus: string;
  favorito: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  private api = 'https://asf-back-by73.onrender.com/auditoria/dashboard';
  constructor(private http: HttpClient) {}

  getAuditorias(): Observable<Auditoria[]> {
    return this.http.get<Auditoria[]>(this.api);
  }
}
