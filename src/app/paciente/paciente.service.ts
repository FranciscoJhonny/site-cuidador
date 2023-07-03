import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  baseUrl = `${environment.UrlPrincipal}/paciente`;
constructor(private http: HttpClient) { }

}
