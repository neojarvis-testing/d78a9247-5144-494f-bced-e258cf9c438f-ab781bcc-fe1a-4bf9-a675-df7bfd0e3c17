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
  successMessage: string = "";  // Success message for popup
  showPopup: boolean = false;  // Controls popup visibility
  showConfirmPopup : boolean = false;
  

  constructor(private productService: ProductService, private router: Router, private activateRoute : ActivatedRoute, private fb : FormBuilder) {

    this.productForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      price: this.fb.control('', [Validators.required, Validators.min(0)]),
      stock: this.fb.control('', [Validators.required, Validators.min(0)]),
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
      this.products = data.map(product => {
        //console.log("Raw Base64 Image Data:", product.productImage);
        let imageData = product.productImage;
        // Ensure the image data is valid and doesn't already contain the prefix
        if (imageData && !imageData.startsWith('data:image')) {
          imageData = `data:image/jpeg;base64,${imageData}`;
        }
        return {
          ...product,
          decodedImage: imageData  // Store the final image source format
        };
      });
  
      this.filteredProducts = this.products; // Initialize filtered products
      this.categories = [...new Set(this.products.map(p => p.category))]; // Extract unique categories
    });
  }
  

  filterProducts(): void {
    if (this.selectedCategory === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === this.selectedCategory);
    }
  }

  // Fetch product details and populate the form
  editProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe(product => {
      this.selectedProductId = productId;
      this.productForm.patchValue(product);
      this.isEditing = true;
    });
  }

  
  // Update product with popup message
  updateProduct(): void {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.selectedProductId!, this.productForm.value)
        .subscribe((data) => {
          this.successMessage = "Product updated successfully!";
          this.showPopup = true;  // Show popup
          this.isEditing = false;
          this.getProducts();
        });
    }
  }

  deleteProduct(productId: number): void {
    this.successMessage = "Are you sure you want to delete this product?";
    this.showConfirmPopup = true; // Show confirmation popup
    this.selectedProductId = productId; // Store product ID temporarily
  }
  
  confirmDelete(): void {
    if (this.selectedProductId !== null) {
      this.productService.deleteProduct(this.selectedProductId).subscribe({
        next: () => {
          this.successMessage = "Product deleted successfully!";
          this.showPopup = true; // Show success popup
          this.products = this.products.filter(product => product.id !== this.selectedProductId);
          this.getProducts();
          this.showConfirmPopup = false; // Hide confirmation popup
        },
        error: () => {
          this.successMessage = "Failed to delete product. Please try again.";
          this.showPopup = true; // Show error popup
          this.showConfirmPopup = false; // Hide confirmation popup
        }
      });
    }
  }
  
  closePopup(): void {
    this.showPopup = false;
  }
  
  cancelDelete(): void {
    this.showConfirmPopup = false; // Hide confirmation popup
  }
  
}


