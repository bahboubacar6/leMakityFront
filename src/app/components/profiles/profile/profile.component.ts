import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   user!: User ;

  constructor(private authService : LoginService, private router: Router){}

  ngOnInit(): void {
    
    this.authService.getCurrentUser().subscribe(
      util =>{
      console.log(util);
      this.user = util;

    })

  }

  updateProfile(user: User) {
    this.router.navigateByUrl("/users/"+user.idUser, {state: user});
  }

  logout(){
    this.authService.logout();
  }

}
