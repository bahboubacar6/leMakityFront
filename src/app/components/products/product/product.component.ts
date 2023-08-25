import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselImage } from 'src/app/models/carousel.model';
import { LigneCmdClient } from 'src/app/models/ligneCmdClient.model';
import { Product } from 'src/app/models/product.model';
import { ProductPage } from 'src/app/models/productPage.model';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  prod!: Product;
  productPage!: ProductPage;
  searchFormGroup: FormGroup | undefined;
  currentPage: number = 0;
  pageSize: number = 6;
  ligneCmdClient: Array<LigneCmdClient> = [];
  quantite: number = 1;

  images: CarouselImage[] = [
    { imageSrc: '/assets/images/makity4.jpg', imageAlt: 'photo1'},
    { imageSrc: '/assets/images/makity2.jpg', imageAlt: 'photo2'},
    { imageSrc: '/assets/images/makity3.jpg', imageAlt: 'photo3'},
    { imageSrc: '/assets/images/makity1.jpg', imageAlt: 'photo4'},
  ];

  constructor(private productService: ProductService, private fb: FormBuilder,
              private router: Router, private panierService: PanierService) { }

  ngOnInit(): void {
    this.initForm();
    this.handleSearchProducts();
  }

  initForm() {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
  }

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

  ajouterLigneCmd(produit: Product): void {

    this.panierService.ajouterLigneCmd(produit);
    
  }

  voirDetailProduit(produit: Product) : void{
    this.router.navigateByUrl("home/detail-product/" + produit.idProduct, { state: produit });
  }

  gotoPage(p: number) {
    this.currentPage = p;
    this.handleSearchProducts();
  }

}
