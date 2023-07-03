import { FileHandle } from "./file-handle.model";

export interface Product {

    idProduct: number;
    productName: string;
    price: number;
    description: string;
    image: string;
    stockQuantity: number;
    productImages: FileHandle[];
    idCategory: number;
}