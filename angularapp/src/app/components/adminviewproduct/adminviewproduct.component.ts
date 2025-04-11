import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adminviewproduct',
  templateUrl: './adminviewproduct.component.html',
  styleUrls: ['./adminviewproduct.component.css']
})
export class AdminviewproductComponent implements OnInit {

  products: any[] = [];
  productForm: FormGroup;
  selectedProductId: number | null = null;
  isEditing: boolean = false;
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private productService: ProductService, private router: Router, private activateRoute : ActivatedRoute, private fb : FormBuilder) {

    this.productForm = this.fb.group({
      productName: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      price: this.fb.control('', Validators.required),
      stock: this.fb.control('', Validators.required),
      category: this.fb.control('', Validators.required),
      productImage : this.fb.control('')
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  // Fetch all products
  getProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  // Fetch product details and populate the form
  editProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe(product => {
      this.selectedProductId = productId;
      this.productForm.patchValue(product);
      this.isEditing = true;
    });
  }

  // Update the product details
  updateProduct(): void {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.selectedProductId!, this.productForm.value)
        .subscribe(() => {
          alert('Product updated successfully!');
          this.isEditing = false;
          this.getProducts(); // Refresh product list
        });
    }
  }

  // Delete product
  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        alert('Product deleted successfully!');
        this.products = this.products.filter(product => product.productId !== productId);
      });
    }
  }

  // Cancel editing and return to list
  cancelEdit(): void {
    this.isEditing = false;
  }
}
