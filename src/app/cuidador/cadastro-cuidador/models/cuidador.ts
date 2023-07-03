import { Telefone } from "./telefone";
export interface Cuidador {
  cuidadorId: number;
  nomeCuidador: string;
  categoriaId: number;
  telefonesCuidador: Telefone [];
}
