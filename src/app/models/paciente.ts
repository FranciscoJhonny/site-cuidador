import { Atendimento } from "./atendimento";
import { Endereco } from "./endereco";
import { Paciente_Pacote } from "./paciente_pacote";
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
  pacientePacotes:Paciente_Pacote[];
  atendimentos:Atendimento[];
  telefonesPaciente:Telefone[];
}
