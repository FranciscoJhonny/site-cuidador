import { CuidadorService } from "./../cuidador.service";
import { Cuidador } from "../../models/cuidador";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Telefone } from "src/app/models/telefone";


@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: [],
})
export class CadastroCuidadorComponent implements OnInit {
  cuidadorForm!: FormGroup;
  cuidador!: Cuidador;
  formResult: string = "";
  listaTelefone!: Telefone[];
  telefone!: Telefone;
  public nomeCuidador: any;
  public telefone01: any;
  public tipotelefone: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cuidadorService: CuidadorService
  ) {}

  ngOnInit(): void {
    this.listaTelefone = [];

    this.cuidadorForm = this.fb.group({
      nomeCuidador: ["", Validators.required],
      categoriaId: ["", Validators.required],
      tipotelefone01: [""],
      telefone01: [""],
    });
  }

  salvarCuidador() {
    if (
      this.cuidadorForm.dirty &&
      this.cuidadorForm.valid &&
      this.listaTelefone.length > 0
    ) {
      this.cuidador = Object.assign({}, this.cuidador, this.cuidadorForm.value);
      this.cuidador.telefonesCuidador = this.listaTelefone;
      this.cuidadorService.PostCuidador(this.cuidador).subscribe(
        (response) => {
          if (response) {
            this.router.navigate(["cuidador"]);
            setTimeout(() => {
              document.location.reload();
            });
          }
        },
        (erro) => {
          console.log(erro);
        }
      );
      this.formResult = JSON.stringify(this.cuidadorForm.value);
    } else {
      this.formResult = "Não submeteu";
    }
  }

  voltar() {
    this.router.navigate(["cuidador"]);
  }
  excluirTelefone(telefone: Telefone) {
    const index = this.listaTelefone.indexOf(telefone);
    this.listaTelefone.splice(index, 1);
  }

  adicionarTelefone() {
    if (
      this.cuidadorForm.value.tipotelefone01 != "" &&
      this.cuidadorForm.value.telefone01 != ""
    ) {
      let telefone: Telefone = {
        telefoneId: 0,
        tipoTelefoneId: this.cuidadorForm.value.tipotelefone01,
        numeroTelefone: this.cuidadorForm.value.telefone01,
        descricaoTipoTelefone:
          this.cuidadorForm.value.tipotelefone01 == 1
            ? "Residencial"
            : this.cuidadorForm.value.tipotelefone01 == 2
            ? "Celular"
            : "Fixo",
      };
      this.listaTelefone.push(telefone);
      this.telefone01 = "";
    }
  }

  handleInput(e: any) {
    if (e != undefined) {
      this.nomeCuidador = e.toUpperCase();
    }
  }
}
