import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Perfil } from 'src/app/models/perfil';
import { UsuarioPostDto } from 'src/app/models/usuarioPostDto';
import { PerfilService } from 'src/app/services/perfil.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;
  public nome: any;
  public senha: any;
  public email: any;
  formResult: string = "";
  public listaPerfil!: Perfil[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private alertModalService: AlertModalService
  ) { }

  ngOnInit() {
    this.createFormUsuario();
    this.listaPerfil = [];
    this.carregarPerfil();
    
  }
  createFormUsuario(){
    this.usuarioForm = this.fb.group({
      nome: ["", Validators.required],
      email: ["", [Validators.required,Validators.email]],
      senha: ["", Validators.required],
      //perfil: [""],
      perfilId: ["", Validators.required]
    });
  }
  carregarPerfil() {
    this.perfilService.getAll().subscribe(
      (perfil: Perfil[]) => {
        this.listaPerfil = perfil;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }
  voltar() {
    this.router.navigate(["usuario"]);
  }
  handleInput(e: any) {
    if (e != undefined) {
      this.nome = e.toUpperCase();
    }
  }
  salvarUsuario() {
    if (this.usuarioForm.dirty && this.usuarioForm.valid ) {
      let usuarioCadastro: UsuarioPostDto = {
        nome: this.usuarioForm.value.nome,
        email: this.usuarioForm.value.email,
        senha: this.usuarioForm.value.senha,
        perfilId:  this.usuarioForm.value.perfilId
      };
      this.usuarioService.PostUsuario(usuarioCadastro).subscribe(
        (response) => {          
          if (response) {            
            this.alertModalService.showAlertSuccess("Usuario cadastrado com sucesso");
            setTimeout(() => {
              this.usuarioForm.reset();
              this.createFormUsuario();
            });
          }
        },
        (erro) => {
          console.log(erro);
        }
      );
    } else {
      this.formResult = "Não submeteu";
    }
  }
}
