import { User } from "./user.model";

export interface OrderPage {
    currentPage: number;
    totalPages:  number;
    pageSize:    number;
    orderDTOS:   OrderDTO[];
}

export interface OrderDTO {
    idOrder:  number;
    amount:   number;
    date:     Date;
    idUser:   User;
    products: Product[];
}

export interface Product {
    idProduct:     number;
    productName:   string;
    price:         number;
    description:   string;
    image:         string;
    stockQuantity: number;
    idCategory:    number;
}