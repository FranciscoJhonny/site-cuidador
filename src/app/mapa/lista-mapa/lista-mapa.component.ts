import { PacienteService } from './../../services/paciente.service';
import { Paciente } from './../../models/paciente';
import { Component, OnInit } from '@angular/core';
import { PacienteDto } from 'src/app/models/pacienteDto';

@Component({
  selector: 'app-lista-mapa',
  templateUrl: './lista-mapa.component.html',
  styleUrls: ['./lista-mapa.component.css']
})
export class ListaMapaComponent implements OnInit {
  public pacientes!: PacienteDto[];
  public idade: any;
  constructor(
    private pacienteService: PacienteService,
  ) { }

  ngOnInit() {
    this.carregarPacientes();
  }

  carregarPacientes() {
    this.pacienteService.getAllMapa().subscribe(
      (pacientes: PacienteDto[]) => {        
        this.pacientes = pacientes;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
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

}
