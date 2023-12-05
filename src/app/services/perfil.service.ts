
import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Perfil } from "../models/perfil";

@Injectable({
  providedIn: "root",
})
export class PerfilService {
  baseUrl = `${environment.UrlPrincipal}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.baseUrl}/get-lista-perfil`);
  }
}
