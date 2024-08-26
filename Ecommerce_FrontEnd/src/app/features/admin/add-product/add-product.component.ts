import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ImageService } from 'src/app/services/ImageService/image.service'; // Importar el servicio de imágenes
import { CategoryService } from 'src/app/core/services/products/category.service'; // Importar el servicio de categorías
import { Category } from 'src/app/core/models/products/categoryModel'; // Importar el modelo de categoría
import { AuthService } from 'src/app/core/services/login/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFileName: string | null = null;
  categories: Category[] = []; // Inicializar el array de categorías


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private imageService: ImageService,
    private categoryService: CategoryService, // Inyectar el servicio de categorías
    private authService: AuthService

  ) {
    this.addProductForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      stock: [0, Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories(); // Cargar las categorías al inicializar el componente
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onAddClick(): void {
    if (this.addProductForm.valid) {
      const formData = this.addProductForm.value;
      
      // Obtener el ID de la tienda del usuario autenticado
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && currentUser.idTienda) {
        const storeId = currentUser.idTienda;

        if (this.selectedFile) {
          this.imageService.uploadImage(formData.name, this.selectedFile)
            .subscribe(response => {
              this.productService.addProduct(
                formData.categoryId, 
                storeId, // Usar el ID de la tienda del usuario autenticado
                formData.name, 
                formData.description, 
                formData.price, 
                formData.stock, 
                response.url
              ).subscribe(productResponse => {
                console.log('Response from AddProduct:', productResponse);
                this.router.navigate(['/admin/products']);
              }, error => {
                console.error('Error:', error);
              });
            }, error => {
              console.error('Error uploading image:', error);
            });
        }
      } else {
        console.error('No se pudo obtener el ID de la tienda del usuario.');
      }
    }
  }
  

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onCancelClick(): void {
    this.router.navigate(['/admin/products']);
  }
}
