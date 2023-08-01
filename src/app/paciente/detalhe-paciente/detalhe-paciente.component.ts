import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { EnderecoPutDto } from './../../models/enderecoPutDto';
import { Responsavel } from './../../models/responsavel';
import { AlertModalService } from './../../shared/alert-modal.service';
import { TurnoService } from './../../services/turno.service';
import { CuidadorService } from './../../services/cuidador.service';
import { PacoteService } from './../../services/pacote.service';
import { PacienteService } from './../../services/paciente.service';
import { Paciente_PacotePutDto } from './../../models/paciente_pacotePutDto';
import { Atendimento } from './../../models/atendimento';
import { Paciente_Pacote } from './../../models/paciente_pacote';
import { ResponsavelPutDto } from './../../models/responsavelPutDto';
import { Telefone } from './../../models/telefone';
import { Turno } from './../../models/turno';
import { Cuidador } from './../../models/cuidador';
import { Pacote } from './../../models/pacote';
import { PacientePutDto } from './../../models/pacientePutDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from "moment";
@Component({
  selector: 'app-detalhe-paciente',
  templateUrl: './detalhe-paciente.component.html',
  styleUrls: []
})
export class DetalhePacienteComponent implements OnInit {
  public pacienteId: number;
  pacienteForm!: FormGroup; 
  telefoneResponsavelForm!: FormGroup;
  responsavelForm!: FormGroup;
  public pacienteCadastro!: PacientePutDto;
  formResult: string = "";
  public listaPacotes!: Pacote[];
  public listaCuidadores!: Cuidador[];
  public listaTurnos!: Turno[];
  public nomePaciente: any;
  public endereco: any;
  public bairro: any;
  public idade: any;
  public dataNascimento: any;
  public dataInicio: any;
  public descricao: any;
  public telefone: any;
  public nomeResponsavel: any;
  public observacao: any;
  public valorPacote: any;
  public valorPlantaoPacote: any;
  public valorPlantaoCuidador: any;
  public salarioCuidador: any;
  listaTelefonePaciente!: Telefone[];
  listaResponsavel!: ResponsavelPutDto[];
  listaTelefoneResponsavel!: Telefone[];
  listaPacotePaciente!: Paciente_Pacote[];
  listaAtendimentos!: Atendimento[];
  listaPacotePacientePutDto!: Paciente_PacotePutDto[];
  formModal: any;

  public bsModalRef!: BsModalRef;
  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private pacoteService: PacoteService,
    private cuidadorService: CuidadorService,
    private turnoService: TurnoService,
    private router: Router,
    private alertModalService: AlertModalService,
    private route: ActivatedRoute
  ) {

    let id = this.route.snapshot.paramMap.get("id");
    this.pacienteId = id as any;
  }
  ngOnInit() { this.createFormPaciente();
    this.createList(); 
    this.carregarPacotes();
    this.carregarCuidador();
    this.carregarTurno();
    this.carregarPaciente();
  }
  carregarPaciente() {
    this.pacienteService.getById(this.pacienteId).subscribe(
      (paciente: Paciente) => {
        this.pacienteForm = this.fb.group({
          nomePaciente: [{value:paciente.nomePaciente,disabled: true }],
          endereco: [{value:paciente.enderecosPaciente[0].logradouro,disabled: true }],
          bairro: [{value:paciente.enderecosPaciente[0].bairro,disabled: true }],
          complemento: [{value:paciente.enderecosPaciente[0].complemento,disabled: true }],
          numero: [{value:paciente.enderecosPaciente[0].numero,disabled: true }],
          cep: [{value:paciente.enderecosPaciente[0].cep,disabled: true }],
          dataNascimento: [{value:this.formatarDataEditar(paciente.dataNascimento.toString()),disabled: true }],
          idade: [{ value:this.calcularIdade(this.formatarDataEditar(paciente.dataNascimento.toString())), disabled: true }],
          dataInicio: [{value:this.formatarDataEditar(paciente.dataInicio.toString()),disabled: true }],
          dataRenovacao: [{value:paciente.dataRenovacao!= null? this.formatarDataEditar(paciente.dataRenovacao.toString()):'',disabled: true }],
          descricao: [{value:paciente.descricaoPaciente,disabled: true }],
          observacao: [{value:paciente.observacao,disabled: true }],
          particularidade: [{value:paciente.particulariedade,disabled: true }],
          jornada: [{value:paciente.jornada,disabled: true }],
        });        
        this.listaTelefonePaciente = paciente.telefonesPaciente;
        this.listaResponsavel = paciente.responsaveisPaciente;
        this.montarPacotePacienteParaEditar(paciente.paciente_Pacotes);
        this.listaAtendimentos = paciente.atendimentosPaciente;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }
  carregarPacotes() {
    this.pacoteService.getAll().subscribe(
      (pacotes: Pacote[]) => {
        this.listaPacotes = pacotes;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }
  carregarCuidador() {
    this.cuidadorService.getAll().subscribe(
      (cuidadores: Cuidador[]) => {
        this.listaCuidadores = cuidadores;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  carregarTurno() {
    this.turnoService.getAll().subscribe(
      (turnos: Turno[]) => {
        this.listaTurnos = turnos;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  createFormPaciente() {
    this.pacienteForm = this.fb.group({
      nomePaciente: ["", Validators.required],
      endereco: ["", Validators.required],
      bairro: ["", Validators.required],
      complemento: [""],
      numero: [""],
      cep: [""],
      dataNascimento: ["", Validators.required],
      idade: [{ value: "", disabled: true }],
      dataInicio: ["", Validators.required],
      dataRenovacao: [""],
      descricao: ["", Validators.required],
      observacao: [""],
      particularidade: [""],
      jornada: [""],
    });
  }
 
 
  createList() {
    this.listaTelefonePaciente = [];
    this.listaResponsavel = [];
    this.listaTelefoneResponsavel = [];
    this.listaPacotePaciente = [];
    this.listaTurnos = [];
    this.listaAtendimentos = [];
    this.listaPacotePacientePutDto=[];
  }
  handleInput(e: any, nomeCampo: any) {
    if (e != undefined) {
      if (nomeCampo === "nomePaciente") {
        this.nomePaciente = e.toUpperCase();
      } else if (nomeCampo === "endereco") {
        this.endereco = e.toUpperCase();
      } else if (nomeCampo === "bairro") {
        this.bairro = e.toUpperCase();
      } else if (nomeCampo === "nomeResponsavel") {
        this.nomeResponsavel = e.toUpperCase();
      } else if (nomeCampo == "observacao") {
        this.observacao = e.toUpperCase();
      }
    }
  }

  calcularIdade(dataNascimento: string) {
    let date = "";
     dataNascimento = dataNascimento.replace('-', '').replace('-', '')
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

  
 
  montarPacotePaciente(){
    this.listaPacotePaciente.forEach(item => {
      let pacotePutDto : Paciente_PacotePutDto = {
        pacoteId: item.pacoteId,
        pacoteMensal: item.valorPacote, //Pacote mensal
        valorPacote: item.valorPacote, //Valor do Pacote
        valorPlantaoPacote:item.valorPlantaoPacote,
        diaPlantao: item.diaPlantao, //Dia/Pacote Mensal
        salarioCuidador: item.salarioCuidador, //Salario cuidador
        salarioDiaCuidador: item.salarioDiaCuidador, //Dia/Cuidador
        valorPlantaoCuidador: item.valorPlantaoCuidador, //Valor/Cuidador
        observacao: item.observacao, // Observação
        valorDesconto: item.valorDesconto, //Desconto
        valorAcrescimo: item.valorAcrescimo, //Acréscimo
        taxaAdminstrativa: item.taxaAdminstrativa, //Taxa Administrativa
      };
      this.listaPacotePacientePutDto.push(pacotePutDto);
   })
  }

  montarPacotePacienteParaEditar(pacientesBanco : Paciente_Pacote[]){
    
    pacientesBanco.forEach(item => {
      let paciente_Pacote: Paciente_Pacote = {
        pacinete_pacoteId: 0,
        pacinteId: 0,
        pacoteId:item.pacoteId,
        descricaoPacoteMensal: item.descricaoPacoteMensal,
        pacoteMensal: item.valorPacote, //Pacote mensal
        valorPacote: item.valorPacote, //Valor do Pacote
        valorPlantaoPacote: Number(item.valorPlantaoPacote),
        diaPlantao: Number(item.diaPlantao), //Dia/Pacote Mensal
        salarioCuidador: Number(item.salarioCuidador), //Salario cuidador
        salarioDiaCuidador: Number(item.salarioDiaCuidador), //Dia/Cuidador
        valorPlantaoCuidador: Number(item.valorPlantaoCuidador), //Valor/Cuidador
        observacao: item.observacao, // Observação
        valorDesconto: item.valorDesconto != 0 ?item.valorDesconto:0, //Desconto
        valorAcrescimo: item.valorAcrescimo!= 0 ?item.valorAcrescimo:0, //Acréscimo
        taxaAdminstrativa: item.taxaAdminstrativa, //Taxa Administrativa
        ativo: true,
      };
      this.listaPacotePaciente.push(paciente_Pacote);
   })
   
  }

  formatarData(dataAnti: any) {
    dataAnti = dataAnti.replace('-', '').replace('-', '')
    return moment(dataAnti.substring(4, 8) + "-" + dataAnti.substring(2, 4) + "-" + dataAnti.substring(0, 2)).format("DD-MMM-YYYY");
  }
formatarDataEditar(data:string){
 return moment( data.substring(0, 4) + "-" + data.substring(5, 7) + "-" + data.substring(8, 10) ).format("DD-MM-YYYY")
}
  handleError() {
    this.alertModalService.showAlertSuccess("");
    }

  public obterValorDoCampo(nomeDoCampo: string) {
    return this.pacienteForm.controls[nomeDoCampo].value;
  }
  voltar() {
    this.router.navigate(["paciente"]);
  }
}
