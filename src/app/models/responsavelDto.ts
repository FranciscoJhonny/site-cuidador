import { TelefoneDto } from "./telefoneDto";

export interface ResponsavelDto {
  responsavelId: number;
  pacienteId: number;
  nomeResponsavel: string;
  ativo: boolean;
  telefonesResponsavel: TelefoneDto[];
}
