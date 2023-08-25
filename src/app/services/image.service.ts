import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SavePhotoParams } from '../models/photo.model';
import { Observable, of} from 'rxjs';
import { catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  host: string = environment.hostPhoto;

  constructor(private http: HttpClient) { }

  public savePhoto(params: SavePhotoParams): Observable<SavePhotoParams> {
    return this.http.post<SavePhotoParams>(`${this.host}save/${params.id}/${params.title}/${params.context}`,params)
    .pipe(
        tap((response:SavePhotoParams) => {
          console.log(response);
        }),
        catchError(err => of(err))
      );
  }
}
