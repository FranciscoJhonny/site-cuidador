import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Turno } from '../models/turno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  baseUrl = `${environment.UrlPrincipal}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.baseUrl}/get-lista-turno`);
  }

}
