import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent 
{

  addProductForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addProductForm = this.fb.group({
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
          // Aquí puedes hacer una solicitud para guardar el producto, redirigir, etc.
          console.log(formData);
          this.router.navigate(['/admin/products']);
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        // Aquí puedes hacer una solicitud para guardar el producto, redirigir, etc.
        console.log(formData);
        this.router.navigate(['/admin/products']);
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
