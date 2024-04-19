import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;
  fotoPerfil: File | null = null; 

  constructor(private fb: FormBuilder,
              private router: Router,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: ['', Validators.required],
      descuento: [''],
      precioFinal: ['', Validators.required],
      
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  goBack() {
    window.history.back();
  }

  onFileSelected(event: any): void {
    this.fotoPerfil = event.target.files[0] as File;
  }
  
  agregarProducto(): void {
    const nombre = this.productoForm.get('nombre')?.value;
    const precio = this.productoForm.get('precio')?.value;
    const descuento = this.productoForm.get('descuento')?.value;
    const precioFinal = this.productoForm.get('precioFinal')?.value;

    if (nombre && this.fotoPerfil && precio && descuento && precioFinal) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('imagen', this.fotoPerfil);
      formData.append('precio', precio);
      formData.append('descuento', descuento);
      formData.append('precioFinal', precioFinal);
  
      this.productService.createProductoWithImage(formData).subscribe({
        next: (response) => {
          console.log('Evento creada correctamente:', response);
          this.router.navigate(['/product']);
        },
        error: (err) => {
          console.error('Error al crear el evento:', err);
          // Manejar el error según sea necesario
        }
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this.productService.getProductoById(this.id).subscribe(data => {
        this.productoForm.setValue({
          nombre: data.nombre,
          imagen: data.imagen,
          precio: data.precio,
          descuento: data.descuento,
          precioFinal: data.precioFinal,
        });
      });
    }
  }
}
