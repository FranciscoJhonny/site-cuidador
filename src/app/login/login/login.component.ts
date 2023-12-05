import { UserService } from './../../services/user.service';
import { AutenticacaoService } from './../../services/autenticacao.service';
import { Usuario } from './../../models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario!: Usuario;
  public emailLogin: any;
  public senhaLogin: any;
  constructor(
    private authService: AutenticacaoService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private alertModalService: AlertModalService
  ) { }

  ngOnInit() {
    this. createFormCuidador();
  }

  createFormCuidador(){
    this.loginForm = this.fb.group({
      emailLogin: ["", [Validators.required,Validators.email]],
      senhaLogin: ["", Validators.required]
    });
  }

  login() {
    const email = this.loginForm.value.emailLogin;
    const senha = this.loginForm.value.senhaLogin;
   this.authService.autenticar(email, senha).subscribe({
     next: (value) => {
       console.log('Login realizado com sucesso', value);
       const usuario = this.userService.retornarUser();
       this.router.navigateByUrl('/home')
     },
     error:(err)=> {
       console.log('Login deu erro', err);
       this.alertModalService.showAlertDanger("Usuário ou senha incorreta");
     }
   });
   
 }


}
