import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductPage } from 'src/app/models/productPage.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  productPage!: ProductPage;
  searchFormGroup: FormGroup | undefined;
  currentPage: number = 0;
  pageSize: number = 6;

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.handleSearchProducts();
    // this.productService.getProducts().subscribe({
    //   next: (data)=>{
    //     this.products = data;
    //   },
    //   error: (err)=>{
    //     console.log(err);
    //   }
    // })
  }

  initForm() {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
  }

  // handleSearchProducts() {
  //   let kw = this.searchFormGroup?.value.keyword;
  //   this.productService.getAllProducts(kw).subscribe({
  //     next: (data)=>{
  //       this.products = data;
  //       console.log(this.products);
  //     },
  //     error: (err)=>{
  //       console.log(err);
  //     }
  //   })
  // }

  handleSearchProducts() {
    let kw = this.searchFormGroup?.value.keyword;
    this.productService.getPageProducts(kw, this.currentPage, this.pageSize).subscribe({
      next: (data)=>{
        this.productPage = data;
        console.log(this.products);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  gotoPage(p: number) {
    this.currentPage = p;
    this.handleSearchProducts();
  }

}
