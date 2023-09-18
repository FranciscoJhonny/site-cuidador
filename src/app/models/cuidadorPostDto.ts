import { TelefonePostDto } from "./telefonePostDto";
export interface CuidadorPostDto {
  nomeCuidador: string;
  categoriaId: number;
  telefonesCuidador: TelefonePostDto [];
}
