import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment';
import { Pacote } from "../models/pacote";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PacoteService {
  baseUrl = `${environment.UrlPrincipal}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pacote[]> {
    return this.http.get<Pacote[]>(`${this.baseUrl}/get-lista-pacote`);
  }
}
