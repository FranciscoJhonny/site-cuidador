import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  public usuarios!: Usuario[];
  token = '';
  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private router: Router,
    private alertModalService: AlertModalService,
  ) { }

  ngOnInit() {
    this.token = this.tokenService.retornarToken();
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.getAll().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }
  cadastrarUsuario() {
    this.router.navigate(["usuario-cadastro"]);
  }
  editarUsuario(usuario: Usuario) {
    this.router.navigateByUrl(`usuario-editar/${usuario.usuarioId}`);
  }
  usuarioDesativar (usuario: Usuario){
    this.usuarioService.desativarUsuario(usuario.usuarioId).subscribe(
      (response) => {  
        if (response) {            
          this.alertModalService.showAlertSuccess("Usuario desativador com sucesso");
          setTimeout(() => {
            this.carregarUsuarios();      
          });
        }
      },
    );
   }
}
