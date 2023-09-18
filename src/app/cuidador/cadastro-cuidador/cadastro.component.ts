import { CuidadorPostDto } from './../../models/cuidadorPostDto';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Telefone } from './../../models/telefone';
import { CuidadorService } from "../../services/cuidador.service";
import { Cuidador } from "../../models/cuidador";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: [],
})
export class CadastroCuidadorComponent implements OnInit {
  cuidadorForm!: FormGroup;
  telefoneCuidadorForm!: FormGroup;
  cuidador!: Cuidador;
  formResult: string = "";
  listaTelefone!: Telefone[];
  telefone!: Telefone;
  public nomeCuidador: any;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cuidadorService: CuidadorService,
    private alertModalService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.listaTelefone = [];
    this.createFormTelefoneCuidador();
    this.createFormCuidador();
  }
createFormCuidador(){
  this.cuidadorForm = this.fb.group({
    nomeCuidador: ["", Validators.required],
    categoriaId: ["", Validators.required]
  });
}
  createFormTelefoneCuidador() {
    this.telefoneCuidadorForm = this.fb.group({
      telefone: ["",[Validators.pattern(/^\(\d{2}\)\s\d{4}-\d{4,5}$/), Validators.required],],
      tipotelefone: [""],
    });
  }
  salvarCuidador() {
    if (
      this.cuidadorForm.dirty &&
      this.cuidadorForm.valid &&
      this.listaTelefone.length > 0
    ) {
      // this.cuidador = Object.assign({}, this.cuidador, this.cuidadorForm.value);
      // this.cuidador.telefonesCuidador = this.listaTelefone;
      let cuidadorCadastro: CuidadorPostDto = {
        nomeCuidador: this.cuidadorForm.value.nomeCuidador,
        categoriaId:  this.cuidadorForm.value.categoriaId,
        telefonesCuidador: this.listaTelefone
      };
      this.cuidadorService.PostCuidador(cuidadorCadastro).subscribe(
        (response) => {          
          if (response) {            
            this.alertModalService.showAlertSuccess("Cuidador cadastrado com sucesso");
            setTimeout(() => {
              //document.location.reload();
              this.telefoneCuidadorForm.reset();
              this.cuidadorForm.reset();
              this.createFormCuidador();
              this.createFormTelefoneCuidador();
              this.listaTelefone = [];
            });
          }
        },
        (erro) => {
          console.log(erro);
        }
      );
      //this.formResult = JSON.stringify(this.cuidadorForm.value);
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
      this.telefoneCuidadorForm.value.tipotelefone != "" &&
      this.telefoneCuidadorForm.value.telefone != ""
    ) {
      let telefone: Telefone = {
        telefoneId: 0,
        tipoTelefoneId: this.telefoneCuidadorForm.value.tipotelefone,
        numeroTelefone: this.telefoneCuidadorForm.value.telefone,
        descricaoTipoTelefone:
          this.telefoneCuidadorForm.value.tipotelefone == 1
            ? "Residencial"
            : this.telefoneCuidadorForm.value.tipotelefone == 2
            ? "Celular"
            : "Fixo",
      };
      this.listaTelefone.push(telefone);
      this.telefoneCuidadorForm.reset();
      this.createFormTelefoneCuidador();
    }
  }

  handleInput(e: any) {
    if (e != undefined) {
      this.nomeCuidador = e.toUpperCase();
    }
  }

  public phoneMask(event: any) {
    // Permite Backspace para usuário remover ")" e "-"
    if (event.keyCode === 8 && this.deletandoCaracter(event.target.value)) {
      return;
    }
    event.target.value = this.maskPhone(event.target.value);
  }
  maskPhone(value: any) {
    let tel = value.replace(/\D/g, "");
    tel = tel.replace(/^0/, "");
    if (tel.length > 10) {
      // ########## -> (##) #####-####
      tel = tel.replace(/^(\d{2})?(\d{5})?(\d{4}).*/, "($1) $2-$3");
    } else if (tel.length > 9) {
      // AA######### -> (AA) ####-####
      tel = tel.replace(/^(\d{2})?(\d{4})?(\d{4}).*/, "($1) $2-$3");
    } else if (tel.length > 5) {
      // ####### -> (##) ####-#
      tel = tel.replace(/^(\d{2})?(\d{4})?(\d{0,4}).*/, "($1) $2-$3");
    } else if (tel.length > 1) {
      // #### -> (##) ##
      tel = tel.replace(/^(\d{2})?(\d{0,5}).*/, "($1) $2");
    } else {
      if (tel !== "") {
        tel = tel.replace(/^(\d*)/, "($1");
      }
    }
    return tel;
  }
  deletandoCaracter(value: any) {
    if (value.length === 9 || value.length === 4 || value.length === 3) {
      return true;
    }
    return false;
  }
}
