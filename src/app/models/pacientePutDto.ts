import { AtendimentoPutDto } from "./atendimentoPutDto";
import { EnderecoPutDto } from "./enderecoPutDto";
import { Paciente_PacotePutDto } from "./paciente_pacotePutDto";
import { ResponsavelPutDto } from "./responsavelPutDto";
import { TelefonePutDto } from "./telefonePutDto";

export interface PacientePutDto {
  pacienteId:number;
  nomePaciente: string;
  dataNascimento: Date;
  dataInicio: Date;
  dataRenovacao: Date;
  descricaoPaciente: string;
  observacao: string;
  particulariedade: string;
  jornada: string;  
  telefonesCuidadorPutDtos:TelefonePutDto[];
  enderecosPacientePutDtos: EnderecoPutDto [];
  responsaveisPacientePutDtos:ResponsavelPutDto[];
  atendimentosPacientePutDtos:AtendimentoPutDto[];
  paciente_PacotePutDtos:Paciente_PacotePutDto[];
}
