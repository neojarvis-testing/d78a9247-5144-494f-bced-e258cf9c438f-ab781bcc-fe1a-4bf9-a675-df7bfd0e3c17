import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
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


  constructor(private productService: ProductService, private cartService: CartService, private router: Router) {}


  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];
    this.updateTotalCount();
  }

  addToCart(product: any): void {
    if (!this.cart.find(item => item.id === product.id)) {
      this.cart.push(product);
      this.saveCart();
    }
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateTotalCount();
  }

  updateTotalCount(): void {
    this.totalProductCount = this.cart.length;
  }

  navigateToViewProduct(): void {
    this.router.navigate(['/view-product']);
  }
  
addToCartService(product: any): void {
   const cartItem: Cart = {
   productId: product.id,
   productName: product.name,
   price: product.price,
   quantity: 1
   };
  this.cartService.addToCart(cartItem);
  this.saveCart();
  this.updateTotalCount();
  }
   
removeFromCartService(productId: number): void {
   this.cartService.removeFromCart(productId);
   this.saveCart();
   this.updateTotalCount();
  }
  

}
