import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {map, catchError, tap} from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { ProductPage } from '../models/productPage.model';

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

  public getAllProducts(kw: string): Observable<Product[]>{
    return this.http.get<Product[]>(this.host + "/search?keyword=" + kw)
    .pipe(
        tap((response) => {
          console.log(response);
        }),
        map(res=> res),
        catchError(err => of(err))
      );
  }

  public getPageProducts(kw: string, page: number, size: number): Observable<ProductPage>{
    return this.http.get<ProductPage>(this.host + "/pageProduct?keyword=" + kw + "&page=" + page + "&size=" + size)
    .pipe(
        tap((response) => {
          console.log(response);
        }),
        map(res=> res),
        catchError(err => of(err))
      );
  }

  // public getPageProducts(page: number, size: number): Observable<ProductPage>{
  //   return this.http.get<ProductPage>(this.host + "/pageProduct?page=" + page + "&size=" + size)
  //   .pipe(
  //       tap((response) => {
  //         console.log(response);
  //       }),
  //       map(res=> res),
  //       catchError(err => of(err))
  //     );
  // }
}
