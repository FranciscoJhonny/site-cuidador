import { AtendimentoDto } from "./atendimentoDto";
import { EnderecoDto } from "./enderecoDto";
import { Paciente_PacoteDto } from "./paciente_pacoteDto";
import { ResponsavelDto } from "./responsavelDto";
import { TelefoneDto } from "./telefoneDto";

export interface PacienteDto {
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
  enderecosPaciente: EnderecoDto[];
  paciente_Pacotes: Paciente_PacoteDto[];
  atendimentosPaciente: AtendimentoDto[];
  telefonesPaciente: TelefoneDto[];
  responsaveisPaciente: ResponsavelDto[];
}
