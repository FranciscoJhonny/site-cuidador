import { TelefoneDto } from "./telefoneDto";

export interface AtendimentoDto {
  atendimentoId: number;
  pacienteId: number;
  cuidadorId: number;
  nomeCuidador: string;
  descricaoCategoria: string;
  turnoId: number;
  turno: string;
  profissionalCor: string;
  dataInicio: Date;
  telefonesCuidador: TelefoneDto[];
}
