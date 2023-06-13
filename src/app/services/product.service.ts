import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {map, catchError, tap} from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host: string = environment.hostProduct;

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.host + "/all")
    .pipe(
        tap((response) => {
          console.log(response);
        }),
        map(res=> res),
        catchError(err => of(err))
      );
  }
}
