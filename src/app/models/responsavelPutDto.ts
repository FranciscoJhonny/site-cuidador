import { TelefonePutDto } from "./telefonePutDto";

export interface ResponsavelPutDto {
    nomeResponsavel:string;
    telefonesResponsavel: TelefonePutDto[];
}
