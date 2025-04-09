import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
 
@Component({
  selector: 'app-adminaddproduct',
  templateUrl: './adminaddproduct.component.html',
  styleUrls: ['./adminaddproduct.component.css']
})
export class AdminaddproductComponent implements OnInit {

  productForm!: FormGroup;
  isSubmitted: boolean = false;
  showPopup: boolean = false; // Manages the popup visibility

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      price: this.fb.control('', Validators.required),
      stock: this.fb.control('', Validators.required),
      category: this.fb.control('', Validators.required)
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          console.log('Product added successfully!');
          this.productForm.reset();
          this.isSubmitted = false;
          this.showPopup = true; // Show the popup after successful submission
        },
        error: (err) => {
          console.error('Failed to add product', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  closePopup(): void {
    this.showPopup = false; // Hide the popup when the close button is clicked
  }
 
}
