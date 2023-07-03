import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Cuidador } from "../../models/cuidador";
import { ActivatedRoute, Router } from "@angular/router";
import { CuidadorService } from "../cuidador.service";
import { Telefone } from "src/app/models/telefone";

@Component({
  selector: "app-editar-cuidado",
  templateUrl: "./editar-cuidado.component.html",
  styleUrls: ["./editar-cuidado.component.css"],
})
export class EditarCuidadoComponent implements OnInit {
  cuidadorForm!: FormGroup;
  cuidador!: Cuidador;
  formResult: string = "";
  listaTelefone!: Telefone[];
  telefone!: Telefone;
  public nomeCuidador: any;
  public telefone01: any;
  public tipotelefone01: any;
  public cuidadorId: number;
  maskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cuidadorService: CuidadorService,
    private route: ActivatedRoute
  ) {
    let id = this.route.snapshot.paramMap.get("id");
    this.cuidadorId = id as any;
  }

  ngOnInit(): void {
    this.listaTelefone = [];

    this.cuidadorForm = this.fb.group({
      nomeCuidador: new FormControl("", Validators.required),
      categoriaId: new FormControl("", Validators.required), 
    });
    this.carregarCuidadores();
    this.createForm();
  }

  createForm() {
    this.maskForm = this.fb.group({
      telefone01: [
        "",
        [Validators.pattern(/^\(\d{2}\)\s\d{4}-\d{4,5}$/), Validators.required],
      ],
      tipotelefone01: [""],
    });
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
  salvarCuidador() {
    if (this.cuidadorForm.valid && this.listaTelefone.length > 0) {
      const dados = this.montarDadosTurma();
      this.cuidadorService.PutCuidador(dados).subscribe(
        async (response) => {
          this.cuidadorForm.reset();
          this.router.navigate(["cuidador"]);
          setTimeout(() => {
            document.location.reload();
          });
        },
        async (erro) => {
          console.log(erro);
        }
      );
      this.formResult = JSON.stringify(this.cuidadorForm.value);
    } else {
      this.formResult = "Não submeteu";
    }
  }
  showValue(field: any) {
    let withoutMask = "";
    if (field) {
      withoutMask = field.replace(/\D+/g, "");
    }
    alert(
      'Valor da variável: "' +
        field +
        '". Apenas números: "' +
        withoutMask +
        '"'
    );
  }

  carregarCuidadores() {
    this.cuidadorService.getById(this.cuidadorId).subscribe(
      (cuidador: Cuidador) => {
        this.cuidadorForm = this.fb.group({
          cuidadorId: this.cuidadorId,
          nomeCuidador: [cuidador.nomeCuidador, Validators.required],
          categoriaId: [cuidador.categoriaId, Validators.required],
        });
        this.listaTelefone = cuidador.telefonesCuidador;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  voltar() {
    this.router.navigate(["cuidador"]);
  }
  adicionarTelefone() {
    if (
      this.maskForm.value.tipotelefone01 != "" &&
      this.maskForm.value.telefone01 != ""
    ) {
      let telefone: Telefone = {
        telefoneId: 0,
        tipoTelefoneId: this.maskForm.value.tipotelefone01,
        numeroTelefone: this.maskForm.value.telefone01,
        descricaoTipoTelefone:
          this.maskForm.value.tipotelefone01 == 1
            ? "Residencial"
            : this.maskForm.value.tipotelefone01 == 2
            ? "Celular"
            : "Fixo",
      };
      this.listaTelefone.push(telefone);

      this.maskForm.reset();
    }
  }

  excluirTelefone(telefone: Telefone) {
    const index = this.listaTelefone.indexOf(telefone);
    this.listaTelefone.splice(index, 1);
  }

  handleInput(e: any) {
    if (e != undefined) {
      this.nomeCuidador = e.toUpperCase();
    }
  }

  public montarDadosTurma() {
    const dados: any = {
      cuidadorId: this.cuidadorId,
      nomeCuidador: this.obterValorDoCampo("nomeCuidador"),
      categoriaId: this.obterValorDoCampo("categoriaId"),
      telefonesCuidador: this.listaTelefone,
    };
    return dados;
  }
  public obterValorDoCampo(nomeDoCampo: string) {
    return this.cuidadorForm.controls[nomeDoCampo].value;
  }
}
