import { Telefone } from "./telefone";

export interface Reponsavel {
    responsavelId:number;
    pacienteId:number;
    nomeResponsavel:number;
    ativo:boolean;
    telefonesResponsavel: Telefone [];

}
