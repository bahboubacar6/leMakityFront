import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 userFormGroup!: FormGroup;
  message: any = undefined;

  constructor(private fb: FormBuilder, private loginService:LoginService, private router: Router){}

  ngOnInit(): void{
    this.initForm();
  }

  initForm(){
    this.userFormGroup = this.fb.group({
      username: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required])
    })
  }

  login(){
    let user = this.userFormGroup.value.username;
    let pwd = this.userFormGroup.value.password;
    this.loginService.login(user,pwd).subscribe(
      (response)=>{
        console.log(response);
        if(response.statusCode == 200){
          console.log(response.data.response.accessToken);
          this.loginService.saveToken(response.data.response.accessToken)
          // Récupère l'URL de redirection depuis le service d'authentification
          // Redirige l'utilisateur
          const redirect = this.loginService.maVariableDeStockage.urlOrigine;
          console.log(redirect)
          this.router.navigate([redirect]);
        }else {
          this.message = 'L\'email ou le mot de passe est incorrect';
          //this.password = '';
        }
      }
    );
  }

}
