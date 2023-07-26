export interface Paciente_Pacote {
  pacinete_pacoteId: number;
  pacinteId: number;
  pacoteId: number;
  descricaoPacoteMensal: string;
  pacoteMensal: number; //Pacote mensal
  valorPacote: number; //Valor do Pacote
  valorPlantaoPacote: number;// Valor Platão Pacote
  diaPlantao: number; //Dia/Pacote Mensal
  salarioCuidador: number; //Salario cuidador
  salarioDiaCuidador: number; //Dia/Cuidador
  valorPlantaoCuidador: number; //Valor/Cuidador
  observacao: string;//Observação
  valorDesconto: number; //Desconto
  valorAcrescimo: number; //Acréscimo
  taxaAdminstrativa: number; //Taxa Administrativa
  ativo: boolean;
}
