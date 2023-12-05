import { Router } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
})
export class MenuComponent implements OnInit {
  nomeUsuar!: string;
  descricaoPerfil!: string;
  constructor(private userService: UserService, private router: Router) {}

  user$ = this.userService.retornarUser();
  ngOnInit() {
    console.log(this.user$);
    this.user$.forEach((x) => {
      (this.nomeUsuar = x?.nome || "");
      (this.descricaoPerfil = x?.descricaoPerfil || "");
  });
  }
  desclogar() {
    this.userService.logout();
    this.router.navigateByUrl("/login");
  }
}
