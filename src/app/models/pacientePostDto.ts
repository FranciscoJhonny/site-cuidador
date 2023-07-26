import { AtendimentoPostDto } from "./atendimentoPostDto";
import { EnderecoPostDto } from "./enderecoPostDto";
import { Paciente_PacotePostDto } from "./paciente_pacotePostDto";
import { ResponsavelPostDto } from "./responsavelPostDto";
import { TelefonePostDto } from "./telefonePostDto";

export interface PacientePostDto {
  nomePaciente: string;
  dataNascimento: Date;
  dataInicio: Date;
  dataRenovacao: Date;
  descricaoPaciente: string;
  observacao: string;
  particulariedade: string;
  jornada: string;  
  telefonesPacientePostDtos:TelefonePostDto[];
  enderecosPacientePostDtos: EnderecoPostDto [];
  responsaveisPacientePostDtos:ResponsavelPostDto[];
  atendimentosPacientePostDtos:AtendimentoPostDto[];
  paciente_PacotePostPostDtos:Paciente_PacotePostDto[];
}
