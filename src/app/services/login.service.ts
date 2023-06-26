import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../models/responseDTO.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 token: string | undefined;
  private currentUser: any;
  isLoggedIn: boolean = false;
  static jwtHelper: JwtHelperService = new JwtHelperService();
  public maVariableDeStockage: any = { urlOrigine: '/home'};

  host: string = environment.hostLogin;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

   public login(email:string|undefined, pw:string|undefined): Observable<ResponseDTO>{
    return this.http.post<ResponseDTO>(this.host+"login",{email:email, password:pw})
    .pipe(
      tap((response:ResponseDTO) => {
        this.saveToken(response.data.response.accessToken);
        this.token = response.data.response.accessToken;
      }),
      catchError(err => of(err))
    );
  }

  signup(utilisateur: User) :Observable<User>{
    console.log("test Ajout service");
    return this.http.post<User>(this.host + 'register', utilisateur)
      .pipe(
        tap((response:User) => {
          console.log(response);
        }),
        catchError(err => of(err))
      );
  }

  getCurrentUser(){
    return this.http.get<User>(this.host + 'current-user')
      .pipe(
        tap((response:User) => {
          console.log(response);
        }),
        catchError(err => of(err))
      );
  };

  saveToken = (token: string) => {
    window.localStorage.setItem('token', token);
  }

  static getToken = () => {
    const token = window.localStorage.getItem('token');
    const notValideToken = LoginService.isTokenExpired();
    if(!token || notValideToken){
      window.localStorage.removeItem('token');
      return null;
    }
    return "Bearer " + token;
  }

  logout(){
    this.isLoggedIn = false;
    window.localStorage.removeItem('token');
    this.router.navigateByUrl("/login");
  }

  getToken(){
    return window.localStorage.getItem('token');
  }

  decodeToken(): string | null{
    const token = window.localStorage.getItem('token');
    let jwtToken = null;
    if (!!token){
      jwtToken = LoginService.jwtHelper.decodeToken(token);
    }
    return jwtToken;
  }

  isAdmin(){
    const decodedToken: any = this.decodeToken();
    if (decodedToken){
      const roles = decodedToken.roles;
      //console.log('isAdmin: ', roles.find((role: any)=> role.authority === "ADMIN"))
      return roles.find((role: any)=> role.authority === "ADMIN");
    }
    return false;
  }

  isUser(){
    const decodedToken: any = this.decodeToken();
    if (decodedToken){
      const roles = decodedToken.roles;
      //console.log('isUser: ', roles.find((role: any)=> role.authority === "USER"))
      return roles.find((role: any)=> role.authority === "USER");
    }
    return false;
  }

  static isTokenExpired(){
    const token = window.localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token)) {
      window.localStorage.removeItem('token');
      return true;
    } else {
      return false;
    }
  }

  redirigerVersPageDeLogin() {
    // Récupération de l'URL actuelle
    const urlActuelle = this.router.url;
    // Stockage de l'URL dans un emplacement accessible
    // (par exemple, dans un service ou dans un store de données)
    this.maVariableDeStockage.urlOrigine = urlActuelle;
    // Redirection vers la page de login
    this.router.navigate(['/login']);
  }
}
