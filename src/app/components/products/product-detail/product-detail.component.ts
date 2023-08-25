import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  produit!: Product;
  idProduct!: number;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.produit = this.router.getCurrentNavigation()?.extras.state as Product;
   }

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.params['id'];
  }

}
