import { Injectable } from '@angular/core';
import { LigneCmdClient } from '../models/ligneCmdClient.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  totalCommande: number = 0;
  ligneCommandeService: Array<LigneCmdClient> = [];
  quantite: number = 1;

  constructor() { }

  calculerTotalCmd(list: Array<LigneCmdClient>): number {
    let total = 0;
    list.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        total += +ligne.quantite * +ligne.prixUnitaire;
      }
    });
    return total;
  }

  ajouterLigneCmd(produit: Product) {
    let ligneCmdAlreadyExists = this.ligneCommandeService.find(lig => lig.product.idProduct === produit.idProduct);
    if (ligneCmdAlreadyExists) {
      this.ligneCommandeService.forEach(lig => {
        if (lig && lig.product.idProduct === produit.idProduct) {
          // @ts-ignore
          lig.quantite = lig.quantite + this.quantite;
        }
      });
    } else {

      let ligneCmd: LigneCmdClient = {
        product: produit,
        prixUnitaire: produit.price,
        quantite: this.quantite
      }
    
      this.ligneCommandeService.push(ligneCmd);
    }
  }
}
