import { TelefoneDto } from "./telefoneDto";

export interface AtendimentoDto {
  atendimentoId: number;
  pacienteId: number;
  cuidadorId: number;
  nomeCuidador: string;
  turnoId: number;
  turno: string;
  profissionalCor: string;
  descricaoCategoria: string;
  dataInicio: Date;
  telefonesCuidador: TelefoneDto[];
}
