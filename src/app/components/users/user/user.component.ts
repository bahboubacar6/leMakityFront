import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserDTO, UserPage } from 'src/app/models/userPage.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users$!: Observable<UserPage>;
  user!: Observable<Array<UserDTO>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  currentPage: number = 0;
  pageSize: number = 3;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.initForm();
    this.searchUser();
  }

  initForm(){
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
  }

  searchUser(){
    let kw = this.searchFormGroup?.value.keyword;
    this.users$ = this.userService.getPageUsers(kw, this.currentPage, this.pageSize).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  gotoPage(p: number) {
    this.currentPage = p;
    this.searchUser();
  }

  deleteUser(u: UserDTO) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.userService.deleteUser(u.idUser).subscribe({
      next: (resp) => {
        this.user = this.user.pipe(
          map(data=>{
            let index = data.indexOf(u);
            data.slice(index, 1);
            console.log(data);
            return data;
          })
        )
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }

  updateUser(u: UserDTO){
    this.router.navigateByUrl("/users/"+u.idUser, {state: u});
  }

  detailUser(id: number){
    this.router.navigateByUrl("/user/"+id);
  }

}
