import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
 
@Component({
  selector: 'app-adminaddproduct',
  templateUrl: './adminaddproduct.component.html',
  styleUrls: ['./adminaddproduct.component.css']
})
export class AdminaddproductComponent implements OnInit {

  productForm: FormGroup;
  isSubmitted: boolean = false;
  showPopup: boolean = false; // Manages the popup visibility
  successMessage : string = "";

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      price: this.fb.control('', [Validators.required, Validators.min(0)]),
      stock: this.fb.control('', [Validators.required, Validators.min(0)]),
      category: this.fb.control('', Validators.required),
      productImage : this.fb.control('')
    });
  }

  handleFileChange(event: any) {
    let file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        //console.log("Base64 Image Data:", reader.result); // Debugging
        this.productForm.patchValue({ productImage: reader.result });
      };
  
      reader.onerror = (error) => {
        console.error("Error converting file to Base64:", error);
      };
    }
  }
  

  addProduct(){
    if(this.productForm.valid){
      console.log(this.productForm.value)
      this.productService.addProduct(this.productForm.value).subscribe(data=>{
        this.successMessage = "Product added successfully!"
        this.productForm.reset();
        this.showPopup = true; // Show popup
      })
    }else{
      alert("Failed to add product");
    }
  }
 
  closePopUp(){
    this.showPopup = false; // Hide popup
  }
 
 
}
 

