import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  ape_paterno: string;
  ape_materno: string;
  correo: string;
  rol: boolean;
}

export interface Auditoria {
  id: number;
  nombre: string;
  tipo: string;
  fecha: string;
  entidad: string;
  estatus: number;
  favorito: boolean;

  descripcion: string;
  observaciones: string;
  resultados: string;
  activo: string;
  usuario: Usuario;
}

export interface AuditoriaResponse {
  data: Auditoria[];
  total: number;
  page: number;
  lastPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  private api = 'https://asf-back-by73.onrender.com/auditoria';

  constructor(private http: HttpClient) {}

  getAuditorias(params?: {
    filtro?: string;
    search?: string;
    page?: number;
  }): Observable<AuditoriaResponse> {
    const queryParams = new URLSearchParams();

    if (params?.filtro && params.filtro.toLowerCase() !== 'todos') {
      queryParams.set('filtro', params.filtro);
    }

    if (params?.search) {
      queryParams.set('search', params.search);
    }

    if (params?.page) {
      queryParams.set('page', params.page.toString());
    }

    const url = `${this.api}?${queryParams.toString()}`;
    return this.http.get<AuditoriaResponse>(url);
  }

  getAuditoriasfiltro(filtro: string): Observable<any> {
    return this.http.get<any[]>(
      `http:///asf-back-by73.onrender.com/auditoria/filtro/${filtro}`
    );
  }

  getAuditoriaById(id: number): Observable<Auditoria> {
    return this.http.get<Auditoria>(`${this.api}/${id}`);
  }
}
