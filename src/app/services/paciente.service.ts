import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { Paciente } from "../models/paciente";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { PacientePostDto } from "../models/pacientePostDto";
import { PacientePutDto } from "../models/pacientePutDto";
import { PacienteDto } from "../models/pacienteDto";

@Injectable({
  providedIn: "root",
})
export class PacienteService {
  baseUrl = `${environment.UrlPrincipal}`;

  constructor(private http: HttpClient) {}

  listar(filtro: number, filtroNome: string): Observable<Paciente[]> {
    const itensPorPagina = 6;

    let params = new HttpParams().set("filtro", filtro);
    if (filtroNome.trim().length > 1) {
      params = params.set("nome", filtroNome);
    }

    return this.http.get<Paciente[]>(
      `${this.baseUrl}/get-lista-paciente-nome`,
      { params }
    );
  }

  getAll(): Observable<Paciente[]> {
    console.log(this.baseUrl + '/get-lista-paciente');
    return this.http.get<Paciente[]>(`${this.baseUrl}/get-lista-paciente`);
  }

  getAllMapa(): Observable<PacienteDto[]> {
    return this.http.get<PacienteDto[]>(`${this.baseUrl}/get-lista-paciente-mapa`);
  }

  getById(id: number): Observable<PacienteDto> {
    return this.http.get<PacienteDto>(`${this.baseUrl}/get-paciente/${id}`);
  }

  public Postpaciente(pacientePostDto: PacientePostDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/post-paciente`, pacientePostDto);
  }

  public PutPaciente(paciente: PacientePutDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/put-paciente`, paciente);
  }
  deletePaciente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-paciente/${id}`);
  }
  verificaPaciente(nomePaciente: string): Observable<any> {

    let params = new HttpParams();
    if (nomePaciente.trim().length > 1) {
      params = params.set('nomePaciente', nomePaciente);
    }   
    console.log(params);
    return this.http.get<boolean>(`${this.baseUrl}/verifica-paciente`, { params });
  }
}
