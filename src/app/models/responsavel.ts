import { Telefone } from "./telefone";

export interface Responsavel {
    responsavelId:number;
    pacienteId:number;
    nomeResponsavel:string;
    ativo:boolean;
    telefonesResponsavel: Telefone[];
}
