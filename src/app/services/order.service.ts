import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { map, catchError, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { OrderPage } from '../models/orderPage.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  host: string = environment.hostOrder;

  constructor(private http: HttpClient) { }

  public getPageOrders(page: number, size: number): Observable<OrderPage>{
    return this.http.get<OrderPage>(this.host + "pageOrder?" + "&page=" + page + "&size=" + size)
    .pipe(
        tap((response) => {
          console.log(response);
        }),
        map(res=> res),
        catchError(err => of(err))
      );
  }

   public deleteOrder(id:number){
    return this.http.delete(this.host + id);
  }

  public updateOrder(order: Order): Observable<Order>{
    return this.http.put<Order>(this.host + "update/" + order.idOrder, order);
  }

   public addOrder(ord: Order): Observable<Order> {
     console.log("save!!!!!!!!!!!!!!!!!");
    return this.http.post<Order>(this.host + 'save', ord)
    .pipe(
        tap((response:Order) => {
          console.log(response);
        }),
        catchError(err => of(err))
      );
  }
}
