import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cuidador } from "../models/cuidador";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class CuidadorService {
  baseUrl = `${environment.UrlPrincipal}/cuidador`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(`${this.baseUrl}/get-lista-cuidador`);
  }

  getById(id: number): Observable<Cuidador> {
    return this.http.get<Cuidador>(`${this.baseUrl}/get-cuidador/${id}`);
  }

  public PostCuidador(cuidador: Cuidador): Observable<any> {
    return this.http.post(`${this.baseUrl}/post-cuidador`, cuidador);
  }

  public PutCuidador(cuidador: Cuidador): Observable<any> {
    return this.http.put(`${this.baseUrl}/put-cuidador`, cuidador);
  }
}
