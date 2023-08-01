export interface Paciente_PacotePutDto {
  pacoteId: number;
  pacoteMensal: number; //Pacote mensal
  diaPlantao: number; //Dia/Pacote Mensal
  valorPacote: number; //Valor do Pacote
  valorPlantaoPacote: number;
  salarioCuidador: number; //Salario cuidador
  salarioDiaCuidador: number; //Dia/Cuidador
  valorPlantaoCuidador: number; //Valor/Cuidador
  observacao: string; //Observação
  valorDesconto: number; //Desconto
  valorAcrescimo: number; //Acréscimo
  taxaAdminstrativa: number; //Taxa Administrativa
}
