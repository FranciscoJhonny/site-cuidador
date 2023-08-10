
import { Component, OnInit } from "@angular/core";
import { Cuidador } from "../../models/cuidador";
import { CuidadorService } from "../../services/cuidador.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Telefone } from './../../models/telefone';

@Component({
  selector: "app-detalhecuidador",
  templateUrl: "./detalhe-cuidador.component.html",
  styles: [],
})
export class DetalheCuidadorComponent implements OnInit {
  cadastroForm!: FormGroup;
  cuidador!: Cuidador;
  formResult: string = "";
  public cuidadorId: number;
  listaTelefone!: Telefone[];
  public cuidadore!: Cuidador;

  constructor(
    private cuidadorService: CuidadorService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {

    let id = this.route.snapshot.paramMap.get('id');
    this.cuidadorId = id as any;
  }

  ngOnInit() {
    this.listaTelefone = [];
    this.cadastroForm = this.fb.group({
      nomeCuidador: [{ value: "", disabled: true }, Validators.required],
      categoriaId: [{ value: "", disabled: true }, Validators.required]
    });
    this.carregarCuidadores();
  }

  carregarCuidadores() {
    this.cuidadorService.getById(this.cuidadorId).subscribe(
      (cuidador: Cuidador) => {
        this.cadastroForm = this.fb.group({
          nomeCuidador: [{ value:cuidador.nomeCuidador, disabled: true }], 
          categoriaId: [{ value:cuidador.categoriaId, disabled: true }],
        })
        this.listaTelefone = cuidador.telefonesCuidador;       
      },
      (erro: any) => {
        console.error(erro);
      }
    );

  }

  voltar() {
    this.router.navigate(["site/cuidador"]);
  }
  
}
