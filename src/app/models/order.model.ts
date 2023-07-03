export interface Order {

    idOrder: number;
    amount: number;
    date: Date;
    idUser: number;
    products: ProductDTO[];
}

export interface ProductDTO {
    idProduct:     number;
    productName:   string;
    price:         number;
    description:   string;
    image:         string;
    stockQuantity: number;
    idCategory:    number;
}