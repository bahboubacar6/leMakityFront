import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {map, catchError, tap} from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { UserPage } from '../models/userPage.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host: string = environment.hostUser;

  constructor(private http: HttpClient) { }

  public addUser(user: User):Observable<User>{
    return this.http.post<User>(this.host + "save",user);
  }

  public updateUser(user: User): Observable<User>{
    console.log("USER ID");
    console.log(user.idUser);
    //return this.http.put<User>(this.host + "all/" + user.idUser, user);
    return this.http.put<User>(`${this.host}update/${user.idUser}`,user);
  }

  public deleteUser(id:number){
    return this.http.delete(this.host + id);
  }

  public getPageUsers(kw: string, page: number, size: number): Observable<UserPage>{
    return this.http.get<UserPage>(this.host + "pageUser?keyword=" + kw + "&page=" + page + "&size=" + size)
    .pipe(
        tap((response) => {
          console.log(response);
        }),
        map(res=> res),
        catchError(err => of(err))
      );
  }
}
