import { TokenService } from './../../services/token.service';
import { TurnoService } from './../../services/turno.service';
import { Paciente_Pacote } from './../../models/paciente_pacote';
import { Telefone } from './../../models/telefone';
import { Turno } from './../../models/turno';
import { Cuidador } from './../../models/cuidador';
import { Pacote } from './../../models/pacote';
import { Atendimento } from './../../models/atendimento';
import { AlertModalService } from './../../shared/alert-modal.service';
import { PacientePostDto } from './../../models/pacientePostDto';
import { Responsavel } from './../../models/responsavel';
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
 import { CuidadorService } from './../../services/cuidador.service';
import { PacoteService } from './../../services/pacote.service';
import * as moment from "moment";
import { PacienteService } from './../../services/paciente.service';
import { Router } from "@angular/router";
import { EnderecoPostDto } from './../../models/enderecoPostDto';
import { ResponsavelPostDto } from './../../models/responsavelPostDto';
import { BsModalRef } from "ngx-bootstrap/modal";
import { Paciente_PacotePostDto } from './../../models/paciente_pacotePostDto';

@Component({
  selector: "app-cadastro-paciente",
  templateUrl: "./cadastro-paciente.component.html",
  styleUrls: [],
})
export class CadastroPacienteComponent implements OnInit {
  pacienteForm!: FormGroup;
  pacoteForm!: FormGroup;
  atendimentoForm!: FormGroup;
  telefonePacienteForm!: FormGroup;
  telefoneResponsavelForm!: FormGroup;
  responsavelForm!: FormGroup;
  public pacienteCadastro!: PacientePostDto;
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
  listaResponsavel!: ResponsavelPostDto[];
  listaTelefoneResponsavel!: Telefone[];
  listaPacotePaciente!: Paciente_Pacote[];
  listaAtendimentos!: Atendimento[];
  listaPacotePacientePostDto!: Paciente_PacotePostDto[];
  formModal: any;
  token = '';
  public desabilitar!: true;

  @Input() type!: "success";
  @Input() message!: string;

  public bsModalRef!: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private pacoteService: PacoteService,
    private cuidadorService: CuidadorService,
    private turnoService: TurnoService,
    private router: Router,
    private alertModalService: AlertModalService,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.createFormPaciente();
    this.createFormPacoteDesativados();
    this.createList();
    this.createFormTelefonePaciente();
    this.createFormTelefoneResponsavel();
    this.createFormResponsavel();
    this.createFormAtendimento();
    this.carregarPacotes();
    this.carregarCuidador();
    this.carregarTurno();
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
  
  createFormPacoteDesativados() {
    this.pacoteForm = this.fb.group({
      pacoteMensal: ["", Validators.required],
      valorPacote: [{ value: "", disabled: true }],
      diaPacoteMensal: ["", Validators.required],
      valorPlantaoPacote: [{ value: "", disabled: true }],
      salarioCuidador: ["", Validators.required],
      salarioDiaCuidador: ["", Validators.required],
      valorPlantaoCuidador: [{ value: "", disabled: true }],
      observacao: [""],
      valorDesconto: [""],
      valorAcrescimo: [""],
      taxaAdminstrativa: [""],
    });
  }
  createFormPacoteAtivadosSemPacoteMensal(pacotemensal: string) {
    this.pacoteForm = this.fb.group({
      pacoteMensal: [pacotemensal, Validators.required],
      valorPacote: [""],
      diaPacoteMensal: ["", Validators.required],
      valorPlantaoPacote: [""],
      salarioCuidador: ["", Validators.required],
      salarioDiaCuidador: ["", Validators.required],
      valorPlantaoCuidador: [""],
      observacao: [""],
      valorDesconto: [""],
      valorAcrescimo: [""],
      taxaAdminstrativa: [""],
    });
  }
  createFormPacoteDesativadosSemPacoteMensal(pacotemensal: string) {
    this.pacoteForm = this.fb.group({
      pacoteMensal: [pacotemensal, Validators.required],
      valorPacote: [{ value: "", disabled: true }],
      diaPacoteMensal: ["", Validators.required],
      valorPlantaoPacote: [{ value: "", disabled: true }],
      salarioCuidador: ["", Validators.required],
      salarioDiaCuidador: ["", Validators.required],
      valorPlantaoCuidador: [{ value: "", disabled: true }],
      observacao: [""],
      valorDesconto: [""],
      valorAcrescimo: [""],
      taxaAdminstrativa: [""],
    });
  }
  createFormTelefonePaciente() {
    this.telefonePacienteForm = this.fb.group({
      telefone: [
        "",
        [Validators.pattern(/^\(\d{2}\)\s\d{4}-\d{4,5}$/), Validators.required],
      ],
      tipotelefone: [""],
    });
  }
  createFormTelefoneResponsavel() {
    this.telefoneResponsavelForm = this.fb.group({
      telefoneresponsavel: [
        "",
        [Validators.pattern(/^\(\d{2}\)\s\d{4}-\d{4,5}$/), Validators.required],
      ],
      tipotelefoneresponsavel: [""],
    });
  }
  createFormResponsavel() {
    this.responsavelForm = this.fb.group({
      nomeResponsavel: [],
    });
  }
  createFormAtendimento() {
    this.atendimentoForm = this.fb.group({
      cuidador: [""],
      turno: [""],
      cor: [""],
      dataInicio: [""],
    });
  }
  createList() {
    this.listaTelefonePaciente = [];
    this.listaResponsavel = [];
    this.listaTelefoneResponsavel = [];
    this.listaPacotePaciente = [];
    this.listaTurnos = [];
    this.listaAtendimentos = [];
    this.listaPacotePacientePostDto=[];
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
      this.createFormTelefonePaciente();
    }
  }

  excluirTelefone(telefone: Telefone) {
    const index = this.listaTelefonePaciente.indexOf(telefone);
    this.listaTelefonePaciente.splice(index, 1);
  }

  adicionarTelefoneResponsavel() {
    if (
      this.telefoneResponsavelForm.value.tipotelefone != "" &&
      this.telefoneResponsavelForm.value.telefone != ""
    ) {
      let telefoneResponsavel: Telefone = {
        telefoneId: 0,
        tipoTelefoneId:
          this.telefoneResponsavelForm.value.tipotelefoneresponsavel,
        numeroTelefone: this.telefoneResponsavelForm.value.telefoneresponsavel,
        descricaoTipoTelefone:
          this.telefoneResponsavelForm.value.tipotelefoneresponsavel == 1
            ? "Residencial"
            : this.telefoneResponsavelForm.value.tipotelefoneresponsavel == 2
            ? "Celular"
            : "Fixo",
      };
      this.listaTelefoneResponsavel.push(telefoneResponsavel);
      this.createFormTelefoneResponsavel();
    }
  }

  excluirTelefoneResponsavel(telefone_responsavel: Telefone) {
    const index = this.listaTelefoneResponsavel.indexOf(telefone_responsavel);
    this.listaTelefoneResponsavel.splice(index, 1);
  }

  adicionarResponsavel() {
    if (this.telefoneResponsavelForm.value.nomeResponsavel != "") {
      let responsavel: ResponsavelPostDto = {
        nomeResponsavel: this.responsavelForm.value.nomeResponsavel,
        telefonesResponsavel: this.listaTelefoneResponsavel,
      };

      this.listaResponsavel.push(responsavel);
      this.createFormTelefoneResponsavel();
      this.createFormResponsavel();
      this.listaTelefoneResponsavel = [];
    }
  }
  excluirResponsavel(responsavel: Responsavel) {
    const index = this.listaResponsavel.indexOf(responsavel);
    this.listaResponsavel.splice(index, 1);
  }
  obterValorPacote() {
    let pacoteId = this.pacoteForm.value.pacoteMensal;
    if(pacoteId != 45){     
      this.createFormPacoteDesativadosSemPacoteMensal(pacoteId);
      this.valorPacote =  this.listaPacotes
      .filter((a) => a.pacoteId == pacoteId)
      .map((a) => a.valorPacote)[0];
    }
    else{
      this.createFormPacoteAtivadosSemPacoteMensal(pacoteId);
    }
  }
  obterValorPlantaoPacote() {
    let pacoteId = this.pacoteForm.value.pacoteMensal;
    let result = pacoteId != 45 ? (this.valorPacote / this.pacoteForm.value.diaPacoteMensal):(this.pacoteForm.value.valorPacote / this.pacoteForm.value.diaPacoteMensal);
    this.valorPlantaoPacote = result.toFixed(2);
  }
  obterValorCuidador() {
    let result =
      this.pacoteForm.value.salarioCuidador /
      this.pacoteForm.value.salarioDiaCuidador;
    this.valorPlantaoCuidador = result.toFixed(2);
  }
  adicionarPacote() {
    if (
      this.pacoteForm.value.pacoteMensal != "" &&
      this.pacoteForm.value.valorPacote != "" &&
      this.pacoteForm.value.diaPacoteMensal != "" &&
      this.pacoteForm.value.valorPlantaoPacote != "" &&
      this.pacoteForm.value.salarioCuidador != "" &&
      this.pacoteForm.value.salarioDiaCuidador != "" &&
      this.pacoteForm.value.valorPlantaoCuidador != "" &&
      this.pacoteForm.value.taxaAdminstrativa != ""
    ) {
      let pacoteId = this.pacoteForm.value.pacoteMensal;
      let descricaoPacote = this.listaPacotes
        .filter((a) => a.pacoteId == pacoteId)
        .map((a) => a.descricaoPacote)[0];
      let paciente_Pacote: Paciente_Pacote = {
        pacinete_pacoteId: 0,
        pacienteId: 0,
        pacoteId: Number(pacoteId),
        descricaoPacoteMensal: descricaoPacote,
        pacoteMensal: pacoteId != 45 ? this.valorPacote: this.pacoteForm.value.valorPacote , //Pacote mensal
        valorPacote:  pacoteId != 45 ? this.valorPacote: this.pacoteForm.value.valorPacote, //Valor do Pacote
        valorPlantaoPacote: Number(this.valorPlantaoPacote),
        diaPlantao: Number(this.pacoteForm.value.diaPacoteMensal), //Dia/Pacote Mensal
        salarioCuidador: Number(this.pacoteForm.value.salarioCuidador), //Salario cuidador
        salarioDiaCuidador: Number(this.pacoteForm.value.salarioDiaCuidador), //Dia/Cuidador
        valorPlantaoCuidador: Number(this.valorPlantaoCuidador), //Valor/Cuidador
        observacao: this.pacoteForm.value.observacao, // Observação
        valorDesconto: this.pacoteForm.value.valorDesconto != "" ?this.pacoteForm.value.valorDesconto:null, //Desconto
        valorAcrescimo: this.pacoteForm.value.valorAcrescimo!= "" ?this.pacoteForm.value.valorAcrescimo:null, //Acréscimo
        taxaAdminstrativa: this.pacoteForm.value.taxaAdminstrativa, //Taxa Administrativa
        ativo: true,
      };
      this.listaPacotePaciente.push(paciente_Pacote);
      this.createFormPacoteDesativados();
    }
  }
  excluirPacote(paciente_pacote: Paciente_Pacote) {
    const index = this.listaPacotePaciente.indexOf(paciente_pacote);
    this.listaPacotePaciente.splice(index, 1);
  }

  adicionarAtendimento() {
    let data = this.atendimentoForm.value.dataInicio;
    let formattedDate = moment( data.substring(4, 8) + "-" + data.substring(2, 4) + "-" + data.substring(0, 2) ).format("DD-MMM-YYYY");
    let cuidadorId = this.atendimentoForm.value.cuidador;
    let turnoId = this.atendimentoForm.value.turno;
    let nomeCuidador = this.listaCuidadores
      .filter((a) => a.cuidadorId == cuidadorId)
      .map((a) => a.nomeCuidador)[0];
    let turno = this.listaTurnos
      .filter((a) => a.turnoId == turnoId)
      .map((a) => a.descricaoTurno)[0];
    if ( this.telefoneResponsavelForm.value.tipotelefone != "" && this.telefoneResponsavelForm.value.telefone != "") {
      let atendimento: Atendimento = {
        atendimentoId: 0,
        pacienteId: 0,
        cuidadorId: cuidadorId,
        nomeCuidador: nomeCuidador,
        turnoId: turnoId,
        turno: turno,
        profissionalCor: this.atendimentoForm.value.cor,
        dataInicio: new Date(formattedDate)
      };
      this.listaAtendimentos.push(atendimento);
      this.createFormTelefoneResponsavel();
    }
  }
  excluirAtendimento(atendimento: Atendimento) {
    const index = this.listaAtendimentos.indexOf(atendimento);
    this.listaAtendimentos.splice(index, 1);
  }

  salvarPaciente() {
    if(this.ValidarCampos()){
    let enderecoPacientePostDto: EnderecoPostDto = {
      logradouro: this.pacienteForm.value.endereco,
      bairro: this.pacienteForm.value.bairro,
      numero: this.pacienteForm.value.numero,
      complemento: this.pacienteForm.value.complemento,
      cep: this.pacienteForm.value.cep,
    };
    this.montarPacotePacinet();
    let pacienteCadastro: PacientePostDto = {
      nomePaciente: this.pacienteForm.value.nomePaciente,
      dataNascimento: new Date(this.formatarData(this.dataNascimento)),
      dataInicio: new Date(this.formatarData(this.pacienteForm.value.dataInicio)),
      dataRenovacao: new Date(this.formatarData(this.pacienteForm.value.dataRenovacao)),
      descricaoPaciente: this.pacienteForm.value.descricao,
      observacao: this.pacienteForm.value.observacao,
      particulariedade: this.pacienteForm.value.particularidade,
      jornada: this.pacienteForm.value.jornada,
      telefonesPacientePostDtos: this.listaTelefonePaciente,
      enderecosPacientePostDtos: [enderecoPacientePostDto],
      responsaveisPacientePostDtos: this.listaResponsavel,
      paciente_PacotePostPostDtos: this.listaPacotePacientePostDto,
      atendimentosPacientePostDtos: this.listaAtendimentos,
    };

    this.pacienteService.verificaPaciente(pacienteCadastro.nomePaciente).subscribe(
      (verifica: boolean) => {
        if(!verifica)  {
          this.pacienteService.Postpaciente(pacienteCadastro).subscribe(
            (response) => {
              if (response) {          
                this.alertModalService.showAlertSuccess("Paciente cadastrado com sucesso");
                setTimeout(() => {
                  this.pacienteForm.reset();
                  this.pacoteForm.reset();
                  this.atendimentoForm.reset();
                  this.telefonePacienteForm.reset();
                  this.telefoneResponsavelForm.reset();
                  this.responsavelForm.reset();
                  this.listaTelefonePaciente= [];
                  this.listaResponsavel= [];
                  this.listaPacotePacientePostDto= [];
                  this.listaAtendimentos= [];
                  this.listaPacotePaciente=[];
                  this.createFormPaciente();
                  this.createFormPacoteDesativados();
                  this.createList();
                  this.createFormTelefonePaciente();
                  this.createFormTelefoneResponsavel();
                  this.createFormResponsavel();
                  this.createFormAtendimento();
                  this.carregarPacotes();
                  this.carregarCuidador();
                  this.carregarTurno();
                  //document.location.reload();
                });
              }
            },
            (erro) => {
              console.log(erro);
            }
          );
          this.formResult = JSON.stringify(this.pacienteForm.value);
        }else
        {
          this.alertModalService.showAlertDanger("Paciente ja cadastrado, favor modificalo");
        }
      },
      (erro: any) => {
        console.error(erro);
      }
    );
    } else{
      this.alertModalService.showAlertDanger("Verifica o(s) campo(s)");
    }
  }

  montarPacotePacinet(){
    this.listaPacotePaciente.forEach(item => {
      let pacotePostDto : Paciente_PacotePostDto = {
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
      this.listaPacotePacientePostDto.push(pacotePostDto);
   })
  }

  formatarData(dataAnti: any) {
    return moment(dataAnti.substring(4, 8) + "-" + dataAnti.substring(2, 4) + "-" + dataAnti.substring(0, 2)).format("DD-MMM-YYYY");
  }

  handleError() {
    this.alertModalService.showAlertSuccess("");
  }

 public ValidarCampos() {    
    const nomePaciente = this.obterValorDoCampo('nomePaciente');
    const endereco = this.obterValorDoCampo('endereco');
    const dataNascimento = this.obterValorDoCampo('dataNascimento');
    const descricao = this.obterValorDoCampo('descricao');
    const jornada = this.obterValorDoCampo('jornada');
    const dataInicio = this.obterValorDoCampo('dataInicio');
    
    if (nomePaciente == undefined || nomePaciente == '' || nomePaciente == null) {
      this.alertModalService.showAlertDanger("Nome do paciente é obrigatório");
      return false ;
    }
    if (endereco == undefined || endereco == '' || endereco == null) {
      this.alertModalService.showAlertDanger("Endereço do paciente é obrigatório");
      return false ;
    }
    if (dataNascimento == undefined || dataNascimento == '' || dataNascimento == null)  {
      this.alertModalService.showAlertDanger("Data nascimento do paciente é obrigatório");
      return false ;
    }
    if (dataInicio == undefined || dataInicio == '' || dataInicio == null)  {
      this.alertModalService.showAlertDanger("Data início é obrigatório");
      return false ;
    }
    if (descricao == undefined || descricao == '' || descricao == null)  {
      this.alertModalService.showAlertDanger("Descrição é obrigatório");
      return false ;
    } 
    if (jornada == undefined || jornada == '' || jornada == null)  {
      this.alertModalService.showAlertDanger("Jornada é obrigatório");
      return false ;
    }    
    if (this.listaResponsavel.length < 1) {
      this.alertModalService.showAlertDanger("É obrigatório no minimo adicionar um responsável para o paciente");
      return false ;
    }
    if (this.listaAtendimentos.length < 1) {
      this.alertModalService.showAlertDanger("É obrigatório no minimo adicionar um atendimento para o paciente");
      return false ;
    }
    if (this.listaPacotePaciente.length < 1) {
      this.alertModalService.showAlertDanger("É obrigatório no minimo adicionar um pacote para o paciente");
      return false ;
    }
    
    return true;
  }

  public obterValorDoCampo(nomeDoCampo: string) {
    return this.pacienteForm.controls[nomeDoCampo].value;
  }
  voltar() {
    this.router.navigate(["paciente"]);
  }
}
