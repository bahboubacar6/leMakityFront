import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeClient } from 'src/app/models/cmdClient.model';
import { LigneCmdClient } from 'src/app/models/ligneCmdClient.model';
import { Product } from 'src/app/models/product.model';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { LoginService } from 'src/app/services/login.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-page-panier',
  templateUrl: './page-panier.component.html',
  styleUrls: ['./page-panier.component.css']
})
export class PagePanierComponent implements OnInit {

  selectedClient: any = {};
  produit!: Product;
  ligneCmdClient: Array<LigneCmdClient> = [];
  quantite: number = 1;
  totalCommande: number = 0;
  errorMsg: Array<string> = [];

  constructor(private router: Router, private panierService: PanierService,
              private authService: LoginService, private cmdClientService: CommandeClientService) { 
    
    this.produit = this.router.getCurrentNavigation()?.extras.state as Product;
  
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      util =>{
      console.log(util);
      this.selectedClient = util;
    })
    this.ligneCmdClient = this.panierService.ligneCommandeService;
    this.totalCommande = this.panierService.calculerTotalCmd(this.ligneCmdClient);
  }

  enregistrerCommande(): void {
    const commande = this.preparerCommande();

      this.cmdClientService.saveCmdClient(commande as CommandeClient)
      .subscribe(cmd => {
        this.router.navigate(['commandesclient']);
      }, error => {
        this.errorMsg = error.error.errors;
      });
  }

  private preparerCommande(): any {
    
      return  {
        client: this.selectedClient,
        code: 'CODE_CMD',
        dateCommande: new Date().getTime(),
        etatCommande: 'EN_PREPARATION',
        ligneCommandeClients: this.ligneCmdClient
      };
    
  }

}
