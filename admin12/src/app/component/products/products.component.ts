import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
   categorias: Categoria[] = [];
  

  constructor(private fb: FormBuilder,
              private router: Router,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute, private categoriaService: CategoriaService  ) {

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: ['', Validators.required],
      descuento: [''],
      precioFinal: [''],
      categorias: [[]] 
      
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.obtenerCategorias();


  // Escuchar cambios en el campo de precio y calcular precio final
    this.productoForm.get('precio')?.valueChanges.pipe(
      debounceTime(300), // Esperar 300ms después de la última pulsación
      distinctUntilChanged() // Emitir solo si el valor cambió
    ).subscribe(precio => {
      const descuento = this.productoForm.get('descuento')?.value || 0;
      const precioFinal = precio - descuento;
      this.productoForm.patchValue({ precioFinal: precioFinal });
    });

    // Escuchar cambios en el campo de descuento y calcular precio final
    this.productoForm.get('descuento')?.valueChanges.pipe(
      debounceTime(300), // Esperar 300ms después de la última pulsación
      distinctUntilChanged() // Emitir solo si el valor cambió
    ).subscribe(descuento => {
      const precio = this.productoForm.get('precio')?.value || 0;
      const precioFinal = precio - descuento;
      this.productoForm.patchValue({ precioFinal: precioFinal });
    });
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
    


    if (!isNaN(precio)) {
      let precioFinal: number;

      if (!isNaN(descuento)) {
        // Si se ingresó un descuento, calcular el precio final
        precioFinal = precio - descuento;
      } else {
        // Si no se ingresó un descuento, el precio final es igual al precio
        precioFinal = precio;
      }

      this.productoForm.patchValue({ precioFinal: precioFinal });

      console.log('Datos del formulario:', this.productoForm.value);

      if (nombre && this.fotoPerfil && !isNaN(precioFinal)) {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('imagen', this.fotoPerfil);
        formData.append('precio', precio.toString());
        formData.append('descuento', descuento.toString());
        formData.append('precioFinal', precioFinal.toString());

// Obtener las categorías seleccionadas del formulario
      const categoriasSeleccionadas = this.productoForm.get('categorias')?.value;


      // Log de las categorías seleccionadas
      console.log('Categorías seleccionadas:', categoriasSeleccionadas);

      
      if (categoriasSeleccionadas) {
        categoriasSeleccionadas.forEach((categoria: string) => {
          formData.append('categorias[]', categoria); // Agregar categorías al FormData
        });
      }

  
      this.productService.createProductoWithImage(formData).subscribe({
        next: (response) => {
          console.log('Producto creada correctamente:', response);
          this.router.navigate(['/product']);
        },
        error: (err) => {
          console.error('Error al crear el evento:', err);
          // Manejar el error según sea necesario
        }
      });
    }
    }

  }

  

   obtenerCategorias() {
    this.categoriaService.getAllCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
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
