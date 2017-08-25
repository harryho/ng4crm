/* Defines the product entity */

export interface IProduct {
    id: number;
    avatar : string;
    categoryId: number;
    productName: string;
    unitPrice: number;
    unitInStock: number;
}

export interface ICategory {
    id: number;
    categoryName: string;
}
