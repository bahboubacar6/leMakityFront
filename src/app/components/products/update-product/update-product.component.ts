import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductFormGroup: FormGroup|undefined;

  idProduct!: number;
  product!: Product

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private route: ActivatedRoute){
    this.idProduct = this.route.snapshot.params['id'];
    this.product = this.router.getCurrentNavigation()?.extras.state as Product;
  }

  ngOnInit():void{
    this.iniForm();
  }

  iniForm(){
    this.updateProductFormGroup = this.fb.group({
      idProduct: this.fb.control(this.product.idProduct),
      productName: this.fb.control(this.product.productName, [Validators.required]),
      price: this.fb.control(this.product.price, [Validators.required]),
      description: this.fb.control(this.product.description, [Validators.required]),
      image: this.fb.control(this.product.image, [Validators.required]),
      stockQuantity: this.fb.control(this.product.stockQuantity, [Validators.required]),
      idCategory: this.fb.control(this.product.idCategory, [Validators.required]),
    })
  }
  
  updateProduct(){
    let prod: Product = this.updateProductFormGroup?.value;
    
    this.productService.updateProduct(prod).subscribe({
      next: (data)=>{
        this.router.navigateByUrl("/product");
      },
      error: (err)=>{
        console.log(err);
        
      }
    });
  }

}
