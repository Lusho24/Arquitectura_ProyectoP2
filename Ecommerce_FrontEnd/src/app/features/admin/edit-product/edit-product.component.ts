import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ImageService } from 'src/app/services/ImageService/image.service';
import { ProductModel } from 'src/app/model/productModel';

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
    private productService: ProductService,
    private imageService: ImageService
  ) {
    this.editProductForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      description: [data.description, Validators.required],
      stock: [data.stock, Validators.required],
      categoryId: [data.categoryId, Validators.required],
    });
    this.imageUrl = data.imageUrl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editProductForm.valid) {
      const formData: ProductModel = { 
        ...this.editProductForm.value, 
        id: this.data.id, 
        imageUrl: this.imageUrl 
      };

      if (this.selectedFile) {
        
        if (this.imageUrl) {
          const oldFileName = this.extractFileName(this.imageUrl);
          const imageId = this.extractImageIdFromUrl(this.imageUrl);

          console.log(`Deleting old image: imageId=${imageId}, fileName=${oldFileName}`);
          this.imageService.deleteImage(imageId, oldFileName).subscribe(
            () => {
              console.log('Old image deleted successfully.');
              this.uploadNewImage(formData);
            },
            error => {
              console.error('Error deleting old image:', error);
             
            }
          );
        } else {
          
          this.uploadNewImage(formData);
        }
      } else {
        this.updateProduct(formData);
      }
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  private uploadNewImage(formData: ProductModel): void {
    if (this.selectedFile) {
      this.imageService.uploadImage(this.data.id.toString(), this.selectedFile).subscribe(
        (response: any) => {
          formData.imageUrl = response.url; 
          this.updateProduct(formData);
        },
        error => {
          console.error('Error uploading image:', error);
         
        }
      );
    } else {
      console.error('No file selected for upload');
      
    }
  }

  private updateProduct(product: ProductModel): void {
    this.productService.updateProduct(product.id, product.categoryId, product.name, product.description, product.price, product.stock, product.imageUrl).subscribe(
      response => {
        console.log('Product updated successfully:', response);
        this.dialogRef.close(product);
      },
      error => {
        console.error('Error updating product:', error);
        
      }
    );
  }

  private extractFileName(url: string): string {
    return url.substring(url.lastIndexOf('/') + 1);
  }

  private extractImageIdFromUrl(url: string): string {
    if (url) {

      const urlParts = url.split('/');
      if (urlParts.length > 1) {
        return urlParts[urlParts.length - 2]; 
      }
    }
    return '';
  }
}
