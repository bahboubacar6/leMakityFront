import { LigneCmdClient } from "./ligneCmdClient.model";
import { User } from "./user.model";

export interface CommandeClient {

  idCmdClient?: number;

  code?: string;

  dateCommande: Date;

  etatCommande: string;

  client: User;

  ligneCommandeClients: LigneCmdClient[];
}
