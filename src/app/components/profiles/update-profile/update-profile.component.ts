import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

 updateUserFormGroup: FormGroup|undefined;

  idUser!: number;
  user!: User

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute){
    this.idUser = this.route.snapshot.params['id'];
    this.user = this.router.getCurrentNavigation()?.extras.state as User;
  }

  ngOnInit():void{
    this.iniForm();
  }

  iniForm(){
    this.updateUserFormGroup = this.fb.group({
      idUser: this.fb.control(this.user.idUser),
      lastName: this.fb.control(this.user.lastName, [Validators.required]),
      firstName: this.fb.control(this.user.firstName, [Validators.required]),
      email: this.fb.control(this.user.email, [Validators.required, Validators.email]),
      password: this.fb.control(this.user.password, [Validators.required])
    })
  }
  
  updateUser(){
    let user: User = this.updateUserFormGroup?.value;
    console.log("test1");
    console.log(user);
    
    this.userService.updateUser(user).subscribe({
      next: (data)=>{
        this.router.navigateByUrl("/users");
      },
      error: (err)=>{
        console.log(err);
        
      }
    });
  }

}
