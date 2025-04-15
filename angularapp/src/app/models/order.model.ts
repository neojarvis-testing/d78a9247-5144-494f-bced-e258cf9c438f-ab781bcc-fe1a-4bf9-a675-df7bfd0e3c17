import { CartItem } from "./cart-item.model";
import { Product } from "./product.model";
import { User } from "./user.model";

export interface Order {
    orderId ?: number;
    product?: Product[]; // List of products in the cart
    user?: User; // Will be the logged-in user
    // product?: Product[]; // List of products in the cart
    shippingAddress: string;
    totalAmount: number;
    quantity:number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
