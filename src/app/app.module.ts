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
import { CadastroPacienteComponent } from "./paciente/cadastro-paciente/cadastro-paciente.component";
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { AlertModalComponent } from "./shared/alert-modal/alert-modal.component";
import { ModalModule } from 'ngx-bootstrap/modal';



export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    ContatoComponent,
    CadastroCuidadorComponent,
    ListaCuidadorComponent,
    DetalheCuidadorComponent,
    EditarCuidadoComponent,
    CadastroPacienteComponent,
    AlertModalComponent
    
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
    CurrencyMaskModule,
    ModalModule.forRoot()
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    provideNgxMask()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
