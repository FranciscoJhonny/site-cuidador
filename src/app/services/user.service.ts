import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { UsuarioDto } from '../models/usuarioDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<UsuarioDto | null>(null);

  constructor(private tokenService: TokenService) {
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  private decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const user = jwt_decode(token) as UsuarioDto;
    this.userSubject.next(user);
  }

  retornarUser(){
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }

}
