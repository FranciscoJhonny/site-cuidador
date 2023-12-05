import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { UserService } from "./user.service";

interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: "root",
})
export class AutenticacaoService {
  baseUrl = `${environment.UrlPrincipal}/usuario`;

  constructor(private http: HttpClient, private userService: UserService) {}

  autenticar( usuario: string, senha: string): Observable<HttpResponse<AuthResponse>> {  
    console.log(`${this.baseUrl}/auth`)  ;
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth`,{ usuario: usuario, senha: senha },{ observe: "response" })
      .pipe(
        tap((response) => {          
          const authToken = response.body?.access_token || "";          
          this.userService.salvarToken(authToken);
        })
      );
  }
}
