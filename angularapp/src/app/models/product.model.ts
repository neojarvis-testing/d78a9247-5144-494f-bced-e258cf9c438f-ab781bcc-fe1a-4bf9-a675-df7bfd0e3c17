import { User } from "./user.model";

export interface Product {

    productId : number;
    name : string;
    description : string;
    price : number;
    stock : number;
    category : string;
    photoImage ?: string;
    createdAt : Date;
    updatedAt : Date;
    user : User;

}

