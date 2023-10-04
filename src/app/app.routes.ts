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
export const rootRouterConfig: Routes = [
  { path: "", redirectTo: "site/home", pathMatch: "full" },
  { path: "site/home", component: HomeComponent},
  { path: "site/login", component: LoginComponent },
  { path: "site/cuidador",component: ListaCuidadorComponent },
  { path: "site/cuidador-cadastro", component: CadastroCuidadorComponent },
  { path: "site/cuidador-detalhe/:id", component: DetalheCuidadorComponent },
  { path: "site/cuidador-editar/:id", component: EditarCuidadoComponent },
  { path: "site/paciente", component: ListaPacienteComponent },
  { path: "site/paciente-cadastro", component: CadastroPacienteComponent },
  { path: "site/paciente-editar/:id", component: EditarPacienteComponent },
  { path: "site/paciente-detalhe/:id", component: DetalhePacienteComponent },
  // { path: "home", component: HomeComponent, canActivate: [authGuard] },
  // { path: "login", component: LoginComponent },
  // { path: "cuidador",component: ListaCuidadorComponent, canActivate: [authGuard] },
  // { path: "cuidador-cadastro", component: CadastroCuidadorComponent,canActivate: [authGuard] },
  // { path: "cuidador-detalhe/:id", component: DetalheCuidadorComponent,canActivate: [authGuard] },
  // { path: "cuidador-editar/:id", component: EditarCuidadoComponent,canActivate: [authGuard] },
  // { path: "paciente", component: ListaPacienteComponent,canActivate: [authGuard] },
  // { path: "paciente-cadastro", component: CadastroPacienteComponent,canActivate: [authGuard] },
  // { path: "paciente-editar/:id", component: EditarPacienteComponent,canActivate: [authGuard] },
  // { path: "paciente-detalhe/:id", component: DetalhePacienteComponent,canActivate: [authGuard] },
  { path: "site/mapa", component: ListaMapaComponent },
  { path: "contato", component: ContatoComponent },
  { path: "sobre", component: SobreComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
