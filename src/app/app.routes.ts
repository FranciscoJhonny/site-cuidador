import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./navegacao/home/home.component";
import { ContatoComponent } from "./institucional/contato/contato.component";
import { SobreComponent } from "./institucional/sobre/sobre.component";
import { CadastroCuidadorComponent } from "./cuidador/cadastro-cuidador/cadastro.component";
import { NotFoundComponent } from "./navegacao/not-found/not-found.component";
import { ListaCuidadorComponent } from "./cuidador/lista-cuidador/lista-cuidador.component";
import { DetalheCuidadorComponent } from "./cuidador/detalhe-cuidador/detalhe-cuidador.component";
import { EditarCuidadoComponent } from "./cuidador/editar-cuidador/editar-cuidado.component";
import { CadastroPacienteComponent } from "./paciente/cadastro-paciente/cadastro-paciente.component";
import { ListaPacienteComponent } from "./paciente/lista-paciente/lista-paciente.component";
import { EditarPacienteComponent } from "./paciente/editar-paciente/editar-paciente.component";
import { DetalhePacienteComponent } from "./paciente/detalhe-paciente/detalhe-paciente.component";
import { ListaMapaComponent } from "./mapa/lista-mapa/lista-mapa.component";
import { LoginComponent } from "./login/login/login.component";
import { authGuard } from "./guards/auth.guard";
import { ListaUsuarioComponent } from "./usuario/lista-usuario/lista-usuario.component";
import { CadastroUsuarioComponent } from "./usuario/cadastro-usuario/cadastro-usuario.component";
import { EditarUsuarioComponent } from "./usuario/editar-usuario/editar-usuario.component";
export const rootRouterConfig: Routes = [
  // { path: "", redirectTo: "home", pathMatch: "full" },
  // { path: "home", component: HomeComponent},
  // { path: "login", component: LoginComponent },
  // { path: "cuidador",component: ListaCuidadorComponent },
  // { path: "cuidador-cadastro", component: CadastroCuidadorComponent },
  // { path: "cuidador-detalhe/:id", component: DetalheCuidadorComponent },
  // { path: "cuidador-editar/:id", component: EditarCuidadoComponent },
  // { path: "paciente", component: ListaPacienteComponent },
  // { path: "paciente-cadastro", component: CadastroPacienteComponent },
  // { path: "paciente-editar/:id", component: EditarPacienteComponent },
  // { path: "paciente-detalhe/:id", component: DetalhePacienteComponent },
  { path: "", component: HomeComponent, canActivate: [authGuard], pathMatch: "full" },
  { path: "home", component: HomeComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent },
  { path: "cuidador",component: ListaCuidadorComponent, canActivate: [authGuard] },
  { path: "cuidador-cadastro", component: CadastroCuidadorComponent,canActivate: [authGuard] },
  { path: "cuidador-detalhe/:id", component: DetalheCuidadorComponent,canActivate: [authGuard] },
  { path: "cuidador-editar/:id", component: EditarCuidadoComponent,canActivate: [authGuard] },
  { path: "paciente", component: ListaPacienteComponent,canActivate: [authGuard] },
  { path: "paciente-cadastro", component: CadastroPacienteComponent,canActivate: [authGuard] },
  { path: "paciente-editar/:id", component: EditarPacienteComponent,canActivate: [authGuard] },
  { path: "paciente-detalhe/:id", component: DetalhePacienteComponent,canActivate: [authGuard] },
  { path: "usuario",component: ListaUsuarioComponent, canActivate: [authGuard] },
  { path: "usuario-cadastro", component: CadastroUsuarioComponent,canActivate: [authGuard] },  
  { path: "usuario-editar/:id", component: EditarUsuarioComponent,canActivate: [authGuard] },
  { path: "mapa", component: ListaMapaComponent },
  { path: "contato", component: ContatoComponent },
  { path: "sobre", component: SobreComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
