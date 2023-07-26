import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paciente } from '../models/paciente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PacientePostDto } from '../models/pacientePostDto';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  baseUrl = `${environment.UrlPrincipal}/paciente`;

constructor(private http: HttpClient) { }
getAll(): Observable<Paciente[]> {
  return this.http.get<Paciente[]>(`${this.baseUrl}/get-lista-paciente`);
}

getById(id: number): Observable<Paciente> {
  return this.http.get<Paciente>(`${this.baseUrl}/get-paciente/${id}`);
}

public Postpaciente(pacientePostDto: PacientePostDto): Observable<any> {
  console.log(pacientePostDto);
  return this.http.post(`${this.baseUrl}/post-paciente`, pacientePostDto);
}

public PutPaciente(paciente: Paciente): Observable<any> {
  return this.http.put(`${this.baseUrl}/put-paciente`, paciente);
}
}
