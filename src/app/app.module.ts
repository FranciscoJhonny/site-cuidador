import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from "./app.component";

import { ReactiveFormsModule } from "@angular/forms";

import { SobreComponent } from "./institucional/sobre/sobre.component";
import { ContatoComponent } from "./institucional/contato/contato.component";
import { NavegacaoModule } from "./navegacao/navegacao.module";

import { AppRoutingModule } from "./app.routes";

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CadastroCuidadorComponent } from "./cuidador/cadastro-cuidador/cadastro.component";
import { ListaCuidadorComponent } from "./cuidador/lista-cuidador/lista-cuidador.component";
import { DetalheCuidadorComponent } from "./cuidador/detalhe-cuidador/detalhe-cuidador.component";
import { SharedModule } from "./shared/shared.module";
import { EditarCuidadoComponent } from "./cuidador/editar-cuidado/editar-cuidado.component";

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    ContatoComponent,
    CadastroCuidadorComponent,
    ListaCuidadorComponent,
    DetalheCuidadorComponent,
    EditarCuidadoComponent
  ],
  imports: [
    BrowserModule, 
    NavegacaoModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,    
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    provideNgxMask()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
