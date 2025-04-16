import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userwishlistproduct',
  templateUrl: './userwishlistproduct.component.html',
  styleUrls: ['./userwishlistproduct.component.css']
})
export class UserwishlistproductComponent implements OnInit {

  wishlist: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    const storedWishlist = localStorage.getItem('wishlist');
    this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  removeFromWishlist(productId: number): void {
    const updatedWishlist = this.wishlist.filter(item => item.id !== productId);
    if (updatedWishlist.length !== this.wishlist.length) {
      this.wishlist = updatedWishlist;
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
  }

  addToCart(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Navigate to cart page
    this.router.navigate(['/cart']);
  }

  isWishlistEmpty(): boolean {
    return this.wishlist.length === 0;
  }



}
