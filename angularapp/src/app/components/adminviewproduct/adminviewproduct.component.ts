import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adminviewproduct',
  templateUrl: './adminviewproduct.component.html',
  styleUrls: ['./adminviewproduct.component.css']
})
export class AdminviewproductComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      this.categories = [...new Set(this.products.map(product => product.category))];
    });
  }

  filterByCategory(): void {
    if (this.selectedCategory === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    }
  }

  navigateToEdit(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }

  updateProduct(productId: number, product: any): void {
    this.productService.updateProduct(productId,product).subscribe(() => {
      alert('Data updated successfully!');
      this.getProducts();
    });
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        alert('Product deleted successfully!');
        this.getProducts();
      });
    }
  }

  toggleAvailability(productId: number, product: any): void {
    product.isAvailable = !product.isAvailable;
    this.updateProduct(productId, product);
  }


}
