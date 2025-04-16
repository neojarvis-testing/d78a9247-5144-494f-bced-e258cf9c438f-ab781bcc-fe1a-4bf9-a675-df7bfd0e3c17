import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adminviewproduct',
  templateUrl: './adminviewproduct.component.html',
  styleUrls: ['./adminviewproduct.component.css']
})
export class AdminviewproductComponent implements OnInit, OnDestroy {

  products: any[] = [];
  productForm: FormGroup;
  selectedProductId: number | null = null;
  isEditing: boolean = false;
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  successMessage: string = "";  // Success message for popup
  showPopup: boolean = false;  // Controls popup visibility
  showConfirmPopup: boolean = false;

  private subscriptions: Subscription = new Subscription(); // Manage subscriptions

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private activateRoute: ActivatedRoute, 
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      price: this.fb.control('', [Validators.required, Validators.min(0)]),
      stock: this.fb.control('', [Validators.required, Validators.min(0)]),
      category: this.fb.control('', Validators.required),
      productImage: this.fb.control('')
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  // Fetch all products
  getProducts(): void {
    const productSubscription = this.productService.getProducts().subscribe(data => {
      this.products = data.map(product => {
        let imageData = product.productImage;
        if (imageData && !imageData.startsWith('data:image')) {
          imageData = `data:image/jpeg;base64,${imageData}`;
        }
        return {
          ...product,
          decodedImage: imageData
        };
      });

      this.filteredProducts = this.products;
      this.categories = [...new Set(this.products.map(p => p.category))];
    });

    this.subscriptions.add(productSubscription);
  }

  filterProducts(): void {
    this.filteredProducts = this.selectedCategory === 'All' 
      ? this.products 
      : this.products.filter(p => p.category === this.selectedCategory);
  }

  // Fetch product details and populate the form
  editProduct(productId: number): void {
    const editSubscription = this.productService.getProductById(productId).subscribe(product => {
      this.selectedProductId = productId;
      this.productForm.patchValue(product);
      this.isEditing = true;
    });

    this.subscriptions.add(editSubscription);
  }

  // Update product with popup message
  updateProduct(): void {
    if (this.productForm.valid) {
      const updateSubscription = this.productService.updateProduct(this.selectedProductId!, this.productForm.value)
        .subscribe(() => {
          this.successMessage = "Product updated successfully!";
          this.showPopup = true;
          this.isEditing = false;
          this.getProducts();
        });

      this.subscriptions.add(updateSubscription);
    }
  }

  deleteProduct(productId: number): void {
    this.successMessage = "Are you sure you want to delete this product?";
    this.showConfirmPopup = true;
    this.selectedProductId = productId;
  }

  confirmDelete(): void {
    if (this.selectedProductId !== null) {
      const deleteSubscription = this.productService.deleteProduct(this.selectedProductId).subscribe({
        next: () => {
          this.successMessage = "Product deleted successfully!";
          this.showPopup = true;
          this.products = this.products.filter(product => product.id !== this.selectedProductId);
          this.getProducts();
          this.showConfirmPopup = false;
        },
        error: () => {
          this.successMessage = "Failed to delete product. Please try again.";
          this.showPopup = true;
          this.showConfirmPopup = false;
        }
      });

      this.subscriptions.add(deleteSubscription);
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }

  cancelDelete(): void {
    this.showConfirmPopup = false;
  }

  // Cleanup subscriptions when component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
