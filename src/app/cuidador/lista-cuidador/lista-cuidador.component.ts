import { TokenService } from './../../services/token.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit } from "@angular/core";
import { Cuidador } from "../../models/cuidador";
import { CuidadorService } from "../../services/cuidador.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Telefone } from './../../models/telefone';
@Component({
  selector: "app-listacuidador",
  templateUrl: "./lista-cuidador.component.html",  
  styleUrls: ['./lista-cuidador.component.css']
})
export class ListaCuidadorComponent implements OnInit {
  public cuidadores!: Cuidador[];
  public exitCuidador = false;
  public cuidador!: Cuidador;
  listaTelefone!: Telefone[];
  public cuidadorForm!: FormGroup;
  formResult: string = "";
  haMaisCuidador: boolean = true;
  paginaAtual: number = 1;
 public  filtro: any;
 public  filtroNome: any;
  favorito: boolean = false;
  public nomeCuidador: any;
  token = '';
  

  constructor(
    private cuidadorService: CuidadorService,
    private alertModalService: AlertModalService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.token = this.tokenService.retornarToken();
    this.carregarForm();
    this.carregarCuidadores();
  }
carregarForm(){
  this.cuidadorForm = this.fb.group({
    filtro: ["0", Validators.required],
    filtroNome: ["", Validators.required],
  });
}
  carregarCuidadores() {
    this.cuidadorService.getAll().subscribe(
      (cuidadores: Cuidador[]) => {
        this.cuidadores = cuidadores;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }
  cadastrarCuidador() {
    this.router.navigate(["cuidador-cadastro"]);
  }

  editarCuidador(cuidador: Cuidador) {
    this.router.navigateByUrl(`cuidador-editar/${cuidador.cuidadorId}`);
  }

  voltar() {
    this.exitCuidador = false;
    this.cuidador = Object.assign({});
    this.carregarCuidadores();
  }
  cuidadorDetalhe(cuidador: Cuidador) {
    this.router.navigateByUrl(`cuidador-detalhe/${cuidador.cuidadorId}`);
  }
 cuidadorExcluir (cuidador: Cuidador){
  this.cuidadorService.deleteCuidador(cuidador.cuidadorId).subscribe(
    (response) => {  
      if (response) {            
        this.alertModalService.showAlertSuccess("Cuidador excluído com sucesso");
        setTimeout(() => {
          this.cuidadorForm.reset();
          this.carregarCuidadores();      
        });
      }
    },
  );
 }
 public pesquisarCuidador() {   
    this.cuidadorService.listar(this.cuidadorForm.value.filtro, this.cuidadorForm.value.filtroNome).subscribe((cuidador) => {
        this.cuidadores = cuidador;
      });
  }
}
