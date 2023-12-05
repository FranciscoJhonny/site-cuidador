import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from '../models/usuario';
import { UsuarioPostDto } from '../models/usuarioPostDto';
@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  baseUrl = `${environment.UrlPrincipal}`;

  constructor(private http: HttpClient) {}
  

  getAll(): Observable<Usuario[]> {    
    return this.http.get<Usuario[]>(`${this.baseUrl}/get-lista-usuario`);
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/get-usuario/${id}`);
  }

  public PostUsuario(usuarioPostDto: UsuarioPostDto): Observable<any> {  
    return this.http.post(`${this.baseUrl}/post-usuario`, usuarioPostDto);
  }

  public PutUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.baseUrl}/put-usuario`, usuario);
  }

  desativarUsuario(id: number): Observable<any> {
    let params = new HttpParams().set("usuarioId", id);
    return this.http.put(`${this.baseUrl}/delete-usuario`, params);
  }
}
