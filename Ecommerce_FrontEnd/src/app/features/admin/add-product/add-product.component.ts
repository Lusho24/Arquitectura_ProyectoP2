import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ImageService } from 'src/app/services/ImageService/image.service'; // Importar el servicio de imágenes

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
    private productService: ProductService,
    private imageService: ImageService // Inyectar el servicio de imágenes
  ) {
    this.addProductForm = this.fb.group({
      categoryId: [0, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      stock: [0, Validators.required],
      imageUrl: [''] // Añadir el campo para la URL de la imagen
    });
  }

  onAddClick(): void {
    if (this.addProductForm.valid) {
      const formData = this.addProductForm.value;
  
      if (this.selectedFile) { // Verificar que selectedFile no sea null
        const reader = new FileReader();
        reader.onload = (e: any) => {
          formData.imageUrl = e.target.result; // Asignar el resultado de FileReader a imageUrl
  
          // Llamar al servicio de gestión de imágenes para subir la imagen a Firebase
          this.imageService.uploadImage(formData.name, this.selectedFile as File)
            .subscribe(response => {
              console.log('Response from uploadImage:', response);
              // Ahora puedes llamar al servicio SOAP para agregar el producto con la URL de la imagen
              this.productService.addProduct(formData.categoryId, formData.name, formData.description, formData.price, formData.stock, response.url)
                .subscribe(productResponse => {
                  console.log('Response from AddProduct:', productResponse);
                  // Manejar la respuesta según sea necesario
                  this.router.navigate(['/admin/products']);
                }, error => {
                  console.error('Error:', error);
                  // Manejar errores aquí
                });
            }, error => {
              console.error('Error uploading image:', error);
              // Manejar errores de carga de imagen aquí
            });
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        // Si selectedFile es null, manejar este caso según tu lógica
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
