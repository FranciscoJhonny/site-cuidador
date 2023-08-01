import { PacienteService } from './../../services/paciente.service';
import { Telefone } from './../../models/telefone';
import { Paciente } from './../../models/paciente';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: []
})
export class ListaPacienteComponent implements OnInit {
  public pacientes!: Paciente[];
  public cuidador!: Paciente;
  listaTelefone!: Telefone[];
  public pacienteForm!: FormGroup;
  formResult: string = "";

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.listaTelefone = [];   
    this.carregarPacientes();
  }

  carregarPacientes() {
    this.pacienteService.getAll().subscribe(
      (pacientes: Paciente[]) => {
        this.pacientes = pacientes;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }
  cadastrarPaciente() {
    this.router.navigate(["paciente-cadastro"]);
  }

  editarPaciente(paciente: Paciente) {
    this.router.navigateByUrl(`paciente-editar/${paciente.pacienteId}`);
  }

  voltar() {
    this.cuidador = Object.assign({});
    this.carregarPacientes();
  }
  detalhePaciente(paciente: Paciente) {
    this.router.navigateByUrl(`paciente-detalhe/${paciente.pacienteId}`);
  }

  
}
