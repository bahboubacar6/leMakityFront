import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  host: string = environment.hostCategory;

  constructor(private http: HttpClient) { }

  public searchCategory(kw: string): Observable<Array<Category>>{

    return this.http.get<Array<Category>>(this.host + "search?keyword=" + kw);

  }

  public addCategorie(cat: Category): Observable<Category> {
    return this.http.post<Category>(this.host + 'save', cat)
    .pipe(
        tap((response:Category) => {
          console.log(response);
        }),
        catchError(err => of(err))
      );
  }

  public deleteCategorie(id: number) {
    return this.http.delete(this.host + id);
  }

  public updateCategorie(cat: Category): Observable<Category> {
    return this.http.put<Category>(this.host + "update/" + cat.idCategory, cat);
  }
}
