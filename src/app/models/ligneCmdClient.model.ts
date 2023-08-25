import { ProductDTO } from "./productPage.model";


export interface LigneCmdClient {

  idLigneCmdClient?: number;

  product: ProductDTO;

  quantite: number;

  prixUnitaire: number;
}