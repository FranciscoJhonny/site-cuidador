import { Endereco } from "./Endereco";
import { Atendimento } from "./atendimento";
import { Pacinte_Pacote } from "./pacinte_pacote";
import { Telefone } from "./telefone";

export interface Paciente {
  pacienteId: number;
  nomePacienteId: string;
  dataNascimento: Date;
  dataInicio: Date;
  dataRenovacao: Date;
  descricaoPaciente: string;
  observacao: string;
  particulariedade: string;
  jornada: string;
  ativo: boolean;
  enderecoPacientes: Endereco [];
  pacientePacotes:Pacinte_Pacote[];
  atendimentos:Atendimento[];
  telefonesPaciente:Telefone[];
}
