import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { ProductDTO, ProductPage } from 'src/app/models/productPage.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-ges',
  templateUrl: './product-ges.component.html',
  styleUrls: ['./product-ges.component.css']
})
export class ProductGesComponent implements OnInit {

  products$!: Observable<ProductPage>;
  product!: Observable<Array<ProductDTO>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  currentPage: number = 0;
  pageSize: number = 6;
  image: any;

  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.initForm();
    this.searchProduct();
  }

  initForm(){
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
  }

  searchProduct(){
    let kw = this.searchFormGroup?.value.keyword;
    this.products$ = this.productService.getPageProducts(kw, this.currentPage, this.pageSize).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  gotoPage(p: number) {
    this.currentPage = p;
    this.searchProduct();
  }

  deleteProduct(prod: ProductDTO) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.productService.deleteProduct(prod.idProduct).subscribe({
      next: (resp) => {
        this.product = this.product.pipe(
          map(data=>{
            let index = data.indexOf(prod);
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

  updateProduct(prod: ProductDTO){
    this.router.navigateByUrl("/product/" + prod.idProduct, {state: prod});
  }

  detailProduct(id: number){
    this.router.navigateByUrl("/home/detail-product/" + id);
  }

}
