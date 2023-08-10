import { Atendimento } from "./atendimento";
import { Endereco } from "./endereco";
import { Paciente_Pacote } from "./paciente_pacote";
import { Responsavel } from "./responsavel";
import { Telefone } from "./telefone";

export interface Paciente {
  pacienteId: number;
  nomePaciente: string;
  idade: number;
  dataNascimento: Date;
  dataInicio: Date;
  dataRenovacao: Date;
  descricaoPaciente: string;
  observacao: string;
  particulariedade: string;
  jornada: string;
  ativo: boolean;
  enderecosPaciente: Endereco[];
  paciente_Pacotes: Paciente_Pacote[];
  atendimentosPaciente: Atendimento[];
  telefonesPaciente: Telefone[];
  responsaveisPaciente: Responsavel[];
}
