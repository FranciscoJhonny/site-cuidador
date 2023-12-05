import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cuidador } from "../models/cuidador";
import { Observable } from "rxjs";
import { CuidadorPostDto } from '../models/cuidadorPostDto';
@Injectable({
  providedIn: "root",
})
export class CuidadorService {
  baseUrl = `${environment.UrlPrincipal}`;

  constructor(private http: HttpClient) {}

  listar(filtro: number, filtroNome: string): Observable<Cuidador[]> {
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set('filtro', filtro);
    if (filtroNome.trim().length > 1) {
      params = params.set('nome', filtroNome);
    }
   
    return this.http.get<Cuidador[]>(`${this.baseUrl}/get-lista-cuidador-nome`, { params });
  }

  getAll(): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(`${this.baseUrl}/get-lista-cuidador`);
  }

  getById(id: number): Observable<Cuidador> {
    return this.http.get<Cuidador>(`${this.baseUrl}/get-cuidador/${id}`);
  }

  public PostCuidador(cuidadorPostDto: CuidadorPostDto): Observable<any> {  
    return this.http.post(`${this.baseUrl}/post-cuidador`, cuidadorPostDto);
  }

  public PutCuidador(cuidador: Cuidador): Observable<any> {
    return this.http.put(`${this.baseUrl}/put-cuidador`, cuidador);
  }

  deleteCuidador(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-cuidador/${id}`);
  }
  verificaCuidador(nomeCuidador: string): Observable<any> {
    let params = new HttpParams();
    if (nomeCuidador.trim().length > 1) {
      params = params.set('nomeCuidador', nomeCuidador);
    }   
    return this.http.get<boolean>(`${this.baseUrl}/verifica-cuidador`, { params });
  }
}
