import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {

  products: any[] = [];
  cart: any[] = [];
  totalProductCount: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.subscribeToCart();
  }


  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  
  subscribeToCart(): void {
    this.productService.cart$.subscribe(cart => {
      this.cart = cart;
      this.updateTotalCount(); 
    });
  }

 
  addToCart(product: any): void {
    this.cartService.addToCart(product); 
    this.productService.loadCart();
    this.router.navigate(['/userNavBar/cart'])    
  }


  increaseQuantity(product: any): void {
    this.cartService.addToCart(product); 
    this.productService.loadCart(); 
  }


  decreaseQuantity(product: any): void {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
      this.cartService.addToCart(existingProduct); 
    } else if (existingProduct && existingProduct.quantity === 1) {
      this.cartService.removeFromCart(product); 
    }
    this.productService.loadCart(); 
  }

  
  updateTotalCount(): void {
    this.totalProductCount = this.cart.reduce((total, product) => total + product.quantity, 0);
  }
  isInCart(product: any): boolean {
    return this.cart.some(item => item.id === product.id);
  }
  
}
