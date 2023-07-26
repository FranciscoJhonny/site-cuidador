import { TelefonePostDto } from "./telefonePostDto";

export interface ResponsavelPostDto {
    nomeResponsavel:string;
    telefonesResponsavel: TelefonePostDto[];
}
