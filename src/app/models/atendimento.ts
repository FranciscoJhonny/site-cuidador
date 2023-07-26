export interface Atendimento {
    atendimentoId: number;
    pacienteId: number;
    cuidadorId:number;
    nomeCuidador:string;
    turnoId:number;
    turno:string,
    profissionalCor:string;
    dataInicio:Date;
}
