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
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (!existingProduct) {
      this.cart.push({ ...product, quantity: 1 });
    } else {
      existingProduct.quantity += 1;
    }
    this.saveCart();
  }

  increaseQuantity(product: any): void {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      this.saveCart();
    }
  }

  decreaseQuantity(product: any): void {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
      this.saveCart();
    } else if (existingProduct && existingProduct.quantity === 1) {
      this.cart = this.cart.filter(item => item.id !== product.id);
      this.saveCart();
    }
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateTotalCount();
  }

  updateTotalCount(): void {
    this.totalProductCount = this.cart.reduce((total, product) => total + product.quantity, 0);
  }
}
