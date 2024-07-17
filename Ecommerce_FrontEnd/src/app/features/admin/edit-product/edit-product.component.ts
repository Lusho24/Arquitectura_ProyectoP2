import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/model/productModel'; // Asegúrate de importar el modelo correcto

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  editProductForm: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel,
    private fb: FormBuilder,
    private productService: ProductService // Inyectar ProductService
  ) {
    this.editProductForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      description: [data.description, Validators.required],
      stock: [data.stock, Validators.required],
      categoryId: [data.categoryId, Validators.required], // Añadir campo de categoría
      // image: [data.imageUrl] // Si deseas mostrar la imagen actual
    });
    this.imageUrl = data.imageUrl; // Asignar la URL de imagen actual si existe
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editProductForm.valid) {
      const formData: ProductModel = { ...this.editProductForm.value, id: this.data.id, imageUrl: this.imageUrl };

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          formData.imageUrl = e.target.result; // Asignar el resultado de FileReader a imageUrl
          this.updateProduct(formData);
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.updateProduct(formData);
      }
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updateProduct(product: ProductModel): void {
    // Llamar al servicio para actualizar el producto
    this.productService.updateProduct(product.id, product.categoryId, product.name, product.description, product.price, product.stock, product.imageUrl).subscribe(
      response => {
        console.log('Product updated successfully:', response);
        this.dialogRef.close(product);
      },
      error => {
        console.error('Error updating product:', error);
        // Manejar el error aquí
      }
    );
  }
}
