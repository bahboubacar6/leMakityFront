import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserFormGroup: FormGroup|undefined;
  message: any = undefined;
  public created: boolean = false;
  user!: User;

  constructor(private fb: FormBuilder, private loginservice: LoginService, private router: Router){

  }

  ngOnInit():void{
    this.iniForm();
  }

  iniForm(){
    this.addUserFormGroup = this.fb.group({
      firstName: this.fb.control("", [Validators.required]),
      lastName: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required, Validators.email]),
      telephone: this.fb.control("", [Validators.required, Validators.minLength(10)]),
      address: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required]),
      resetPasswordToken: this.fb.control("", [Validators.required]),
    })
  }
  
  addUser(){
    console.log("test Ajout");
    
    let user: User = this.addUserFormGroup?.value;
    if(user.password != user.resetPasswordToken){
      return;
    }
    console.log(user);
    
    if(user)
    this.loginservice.signup(user).subscribe(
      (response: User | any)=>{
        console.log(response);
        if(!response.status){
          console.log(response.status);
          // Redirige l'utilisateur
          this.router.navigate(['/login']);
        }else{
          this.message = 'Il y a eu une erreur. Vérifiez vos saisies';
          console.log(response.status);
        }
        this.created = true;
      });
  }

}
