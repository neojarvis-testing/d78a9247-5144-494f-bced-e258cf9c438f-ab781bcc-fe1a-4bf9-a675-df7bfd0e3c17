import { User } from "./user.model";

export interface CartItem {
    id?: number; // Optional if the backend generates it
    productId: number;
    productName: string;
    quantity: number;
    productPrice: number; // Ensure this matches the backend
    user: User; // Assuming each cart item is associated with a user
  }
  