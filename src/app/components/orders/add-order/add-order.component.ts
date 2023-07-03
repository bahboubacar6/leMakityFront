import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  addOrderFormGroup: FormGroup|undefined;
  message: any = undefined;
  public created: boolean = false;
  order!: Order;

  constructor(private fb: FormBuilder, private orderService: OrderService, private router: Router){

  }

  ngOnInit():void{
    this.iniForm();
  }

  iniForm(){
    this.addOrderFormGroup = this.fb.group({
      amount: this.fb.control("", [Validators.required]),
      date: this.fb.control("", [Validators.required]),
      idUser: this.fb.control("", [Validators.required]),
      products: this.fb.control("", [Validators.required]),
    })
  }
  
  addOrder(){
    
    let ord: Order = this.addOrderFormGroup?.value;
    
    this.orderService.addOrder(ord).subscribe(
      (response: Order | any)=>{
        
        console.log(response);
        if (!response.status) {
          console.log(response.status);
          // Redirige vers la liste des commandes
          this.router.navigate(['/orders']);
        } else {
          this.message = 'Il y a eu une erreur. Vérifiez vos saisies';
          console.log(response.status);
        }
      });
  }

}
