export interface ProductPage {
    currentPage: number;
    totalPages:  number;
    pageSize:    number;
    productDTOS: ProductDTO[];
}

export interface ProductDTO {
    idProduct:     number;
    productName:   string;
    price:         number;
    description:   string;
    image:         string;
    stockQuantity: number;
    idCategory:    null;
}