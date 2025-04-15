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
    const savedWishlist = localStorage.getItem('wishlist');
    this.wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
  }

  removeFromWishlist(productId: number): void {
    this.wishlist = this.wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  addToCart(product: any): void {
    // Navigate to cart with the selected product
    this.router.navigate(['/userNavBar/cart']);
  }

  isWishlistEmpty(): boolean {
    return this.wishlist.length === 0;
  }


}
