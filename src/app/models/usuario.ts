import { Perfil } from "./perfil";

export interface Usuario {
    usuarioId: number ,
       nome: string
       email: string ,
       perfilId: number,
       ativo:boolean,
       perfil: Perfil;
       
}
