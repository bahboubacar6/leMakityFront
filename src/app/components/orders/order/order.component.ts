import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { OrderDTO, OrderPage } from 'src/app/models/orderPage.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders$!: Observable<OrderPage>;
  order!: Observable<Array<OrderDTO>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  currentPage: number = 0;
  pageSize: number = 3;

  constructor(private orderService: OrderService, private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.initForm();
    this.searchOrder();
  }

  initForm(){
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
  }

  searchOrder(){
    let kw = this.searchFormGroup?.value.keyword;
    this.orders$ = this.orderService.getPageOrders(this.currentPage, this.pageSize).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  gotoPage(p: number) {
    this.currentPage = p;
    this.searchOrder();
  }

  deleteOrder(o: OrderDTO) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.orderService.deleteOrder(o.idOrder).subscribe({
      next: (resp) => {
        this.order = this.order.pipe(
          map(data=>{
            let index = data.indexOf(o);
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

  updateOrder(o: OrderDTO){
    this.router.navigateByUrl("/orders/"+ o.idOrder, {state: o});
  }

  detailOrder(id: number){
    this.router.navigateByUrl("/order/"+id);
  }

}
