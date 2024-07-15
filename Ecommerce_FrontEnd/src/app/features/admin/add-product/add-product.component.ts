import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  addProductForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.addProductForm = this.fb.group({
      categoryId: [0, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      stock: [0, Validators.required],
      image: [null]
    });
  }

  onAddClick(): void {
    if (this.addProductForm.valid) {
      const formData = this.addProductForm.value;

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          formData.image = e.target.result;
          // Llamar al servicio SOAP para agregar el producto
          this.productService.addProduct(formData.categoryId, formData.name, formData.description, formData.price, formData.stock)
            .subscribe(response => {
              console.log('Response from AddProduct:', response);
              // Manejar la respuesta según sea necesario
              this.router.navigate(['/admin/products']);
            }, error => {
              console.error('Error:', error);
              // Manejar errores aquí
            });
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        // Llamar al servicio SOAP para agregar el producto
        this.productService.addProduct(formData.categoryId, formData.name, formData.description, formData.price, formData.stock)
          .subscribe(response => {
            console.log('Response from AddProduct:', response);
            // Manejar la respuesta según sea necesario
            this.router.navigate(['/admin/products']);
          }, error => {
            console.error('Error:', error);
            // Manejar errores aquí
          });
      }
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onCancelClick(): void {
    this.router.navigate(['/admin/products']);
  }
}
