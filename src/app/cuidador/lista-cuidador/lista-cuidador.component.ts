import { Component, OnInit } from "@angular/core";
import { Cuidador } from "../../models/cuidador";
import { CuidadorService } from "../../services/cuidador.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Telefone } from "src/app/models/telefone";

@Component({
  selector: "app-listacuidador",
  templateUrl: "./lista-cuidador.component.html",
  styles: [],
})
export class ListaCuidadorComponent implements OnInit {
  public cuidadores!: Cuidador[];
  public exitCuidador = false;
  public cuidador!: Cuidador;
  listaTelefone!: Telefone[];
  public cuidadorForm!: FormGroup;
  formResult: string = "";

  constructor(
    private cuidadorService: CuidadorService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.listaTelefone = [];
    this.cuidadorForm = this.fb.group({
      nomeCuidador: ["", Validators.required],
      categoriaId: ["", Validators.required],
      tipotelefone01: ["", Validators.required],
      telefone01: ["", Validators.required],
    });
    this.carregarCuidadores();
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

  // cuidadorSelect(cuidador: Cuidador) {
  //   this.exitCuidador = true;
  //   this.cuidador = cuidador;

  //   this.cuidadorForm.patchValue({
  //     nomeCuidador: cuidador.nomeCuidador,
  //     categoriaId: cuidador.categoriaId,
  //   });
  //   this.listaTelefone = cuidador.telefonesCuidador;
  // }

  cadastrarCuidador() {
    this.router.navigate(["cuidador-cadastro"]);
  }

  editarCuidador(cuidador: Cuidador) {
    this.router.navigateByUrl(`cuidador-editar/${cuidador.cuidadorId}`);

    // if (
    //   this.cuidadorForm.dirty &&
    //   this.cuidadorForm.valid
    // ) {
    //   this.cuidador = Object.assign({}, this.cuidador, this.cuidadorForm.value);
    //   // this.cuidador.telefonesCuidador = this.listaTelefone;
    //   this.cuidadorService.PostCuidador(this.cuidador).subscribe(
    //     (response) => {
    //       if (response) {
    //         this.router.navigate(["cuidador"]);
    //         setTimeout(() => {
    //           document.location.reload();
    //         });
    //       }
    //     },
    //     (erro) => {
    //       console.log(erro);
    //     }
    //   );
    //   this.formResult = JSON.stringify(this.cuidadorForm.value);
    // } else {
    //   this.formResult = "Não submeteu";
    // }
  }

  voltar() {
    this.exitCuidador = false;
    this.cuidador = Object.assign({});
    this.carregarCuidadores();
  }
  cuidadorDetalhe(cuidador: Cuidador) {
    this.router.navigateByUrl(`cuidador-detalhe/${cuidador.cuidadorId}`);
  }

  
}
