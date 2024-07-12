import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      stock: [0, Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // Aquí deberías cargar el producto por su ID desde un servicio
      // Por ahora, simularemos con un producto ficticio
      this.product = {
        id: id,
        image: 'https://via.placeholder.com/150',
        name: 'Producto de Ejemplo',
        price: 100,
        stock: 50
      };
      if (this.product) {
        this.editProductForm.patchValue(this.product);
      }
    });
  }

  onSaveClick(): void {
    if (this.editProductForm.valid) {
      // Aquí puedes agregar la lógica para guardar los cambios
      console.log('Producto guardado:', this.editProductForm.value);
      this.router.navigate(['/admin/products']);
    }
  }

  onCancelClick(): void {
    this.router.navigate(['/admin/products']);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editProductForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
