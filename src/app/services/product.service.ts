import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public getPageProducts(kw: string, page: number, size: number): Observable<ProductPage>{
    return this.http.get<ProductPage>(this.host + "pageProduct?keyword=" + kw + "&page=" + page + "&size=" + size)
    .pipe(
        tap((response) => {
          console.log(response);
        }),
        map(res=> res),
        catchError(err => of(err))
      );
  }

   public deleteProduct(id:number){
    return this.http.delete(this.host + id);
  }

  public updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(this.host + "update/" + product.idProduct, product);
  }

  public addProduct(prod: Product): Observable<Product> {
    return this.http.post<Product>(this.host + 'save', prod)
    .pipe(
        tap((response:Product) => {
          console.log(response);
        }),
        catchError(err => of(err))
      );
  }

   public getProduct(idProduct: number ): Observable<Product>{
    return this.http.get<Product>(this.host + idProduct);
  }
}
