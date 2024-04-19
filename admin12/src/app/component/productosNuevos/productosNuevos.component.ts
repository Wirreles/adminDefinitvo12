import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NuevoProductoService } from 'src/app/services/productoNuevo.service';
import { NuevoProducto } from 'src/app/models/pNuevo';

@Component({
  selector: 'app-products',
  templateUrl: './productosNuevos.component.html',
  styleUrls: ['./productosNuevos.component.scss'],
})
export class NuevosProductsComponent implements OnInit {
  nuevosProductosForm: FormGroup;
  titulo = 'Crear Nuevo Producto';
  id: string | null;
  fotoPerfil: File | null = null; 

  constructor(private fb: FormBuilder,
              private router: Router,
              private nuevoProductoService: NuevoProductoService,
              private activatedRoute: ActivatedRoute) {
    this.nuevosProductosForm = this.fb.group({
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
  
  agregarProductoNuevo(): void {
    const nombre = this.nuevosProductosForm.get('nombre')?.value;
    const precio = this.nuevosProductosForm.get('precio')?.value;
    const descuento = this.nuevosProductosForm.get('descuento')?.value;
    const precioFinal = this.nuevosProductosForm.get('precioFinal')?.value;

    if (nombre && this.fotoPerfil && precio && descuento && precioFinal) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('imagen', this.fotoPerfil);
      formData.append('precio', precio);
      formData.append('descuento', descuento);
      formData.append('precioFinal', precioFinal);
  
      this.nuevoProductoService.createNewProductoWithImage(formData).subscribe({
        next: (response) => {
          console.log('Evento creada correctamente:', response);
          this.router.navigate(['/productoNuevo']);
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
      this.nuevoProductoService.getProductoNuevoById(this.id).subscribe(data => {
        this.nuevosProductosForm.setValue({
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
