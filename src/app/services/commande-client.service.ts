import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommandeClient } from '../models/cmdClient.model';
import { Observable, of} from 'rxjs';
import { catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommandeClientService {

  host: string = environment.hostCmdClient;

  constructor(private http: HttpClient) { }

  public saveCmdClient(cmdClient: CommandeClient): Observable<CommandeClient> {
    return this.http.post<CommandeClient>(this.host + 'create', cmdClient)
    .pipe(
        tap((response:CommandeClient) => {
          console.log(response);
        }),
        catchError(err => of(err))
      );
  }
}
