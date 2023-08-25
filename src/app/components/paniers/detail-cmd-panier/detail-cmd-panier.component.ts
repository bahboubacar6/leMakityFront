import { Component, OnInit, Input } from '@angular/core';
import { LigneCmdClient } from 'src/app/models/ligneCmdClient.model';

@Component({
  selector: 'app-detail-cmd-panier',
  templateUrl: './detail-cmd-panier.component.html',
  styleUrls: ['./detail-cmd-panier.component.css']
})
export class DetailCmdPanierComponent implements OnInit {

  @Input()
  ligneCommande: LigneCmdClient = {
    product: {
      idProduct: 0,
      productName: '',
      price: 0,
      description: '',
      image: '',
      stockQuantity: 0,
      idCategory: 0
    },
    quantite: 0,
    prixUnitaire: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

}
