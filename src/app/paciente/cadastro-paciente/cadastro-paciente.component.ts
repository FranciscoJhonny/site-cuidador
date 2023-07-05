import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Telefone } from "src/app/models/telefone";

@Component({
  selector: "app-cadastro-paciente",
  templateUrl: "./cadastro-paciente.component.html",
  styleUrls: [],
})
export class CadastroPacienteComponent implements OnInit {
  pacienteForm!: FormGroup;
  public paciente: any;
  public endereco: any;
  public bairro: any;
  public idade: any;
  public dataNascimento: any;
  public telefone: any;  
  listaTelefonePaciente!: Telefone[];
  telefonePacienteForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      paciente: ["", Validators.required],
      endereco: ["", Validators.required],
      bairro: ["", Validators.required],
      dataNascimento: ["", Validators.required],
      idade: [{ value: '', disabled: true }],
      cep: [""]
    });
    this.createForm();
  }
  createForm() {
    this.listaTelefonePaciente = [];
    this.telefonePacienteForm = this.fb.group({
      telefone: [
        "",
        [Validators.pattern(/^\(\d{2}\)\s\d{4}-\d{4,5}$/), Validators.required],
      ],
      tipotelefone: [""],
    });
  }
  handleInput(e: any, nomeCampo: any) {
    if (e != undefined) {
      if (nomeCampo === "paciente") {
        this.paciente = e.toUpperCase();
      } else if (nomeCampo === "endereco") {
        this.endereco = e.toUpperCase();
      } else if (nomeCampo === "bairro") {
        this.bairro = e.toUpperCase();
      }
    }
  }

  calcularIdade(dataNascimento: string) {
    let date = "";
    if (dataNascimento != undefined && dataNascimento.length === 8) {
      date = dataNascimento.replace(/(\d{2})?(\d{2})?(\d{4})/, "$3/$2/$1");
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.idade = age;
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

  adicionarTelefone() {
    if (
      this.telefonePacienteForm.value.tipotelefone != "" &&
      this.telefonePacienteForm.value.telefone != ""
    ) {
      let telefone: Telefone = {
        telefoneId: 0,
        tipoTelefoneId: this.telefonePacienteForm.value.tipotelefone,
        numeroTelefone: this.telefonePacienteForm.value.telefone,
        descricaoTipoTelefone:
          this.telefonePacienteForm.value.tipotelefone == 1
            ? "Residencial"
            : this.telefonePacienteForm.value.tipotelefone == 2
            ? "Celular"
            : "Fixo",
      };
      this.listaTelefonePaciente.push(telefone);

      this.telefonePacienteForm.reset();
    }
  }

  excluirTelefone(telefone: Telefone) {
    const index = this.listaTelefonePaciente.indexOf(telefone);
    this.listaTelefonePaciente.splice(index, 1);
  }

}
