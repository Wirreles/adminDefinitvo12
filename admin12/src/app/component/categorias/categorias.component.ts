import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  categoriaForm: FormGroup ;
  titulo = 'Crear Categoria';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private categoriaService: CategoriaService,
              private activatedRoute: ActivatedRoute) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      imagen: ['', Validators.required],    
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  goBack() {
    window.history.back();
  }

  agregarCategoria() {
    if (this.categoriaForm) {
      const nombreControl = this.categoriaForm.get('nombre');
      const imagenControl = this.categoriaForm.get('imagen');
      
      if (nombreControl && imagenControl) {
        const categoria: Categoria = {
          nombre: nombreControl.value,
          imagen: imagenControl.value,
        };
  
        if (this.id !== null) {
          this.categoriaService.updateCategoria(this.id, categoria).subscribe(data => {
            this.router.navigate(['/categoria']);
          });
        } else {
          this.categoriaService.createCategoria(categoria).subscribe(data => {
            this.router.navigate(['/categoria']);
          });
        }
      }
    }
  }
//   imagen: File | null = null;

//  onFileSelected(event: any): void {
//   this.imagen = event.target.files[0] as File;
//   console.log('Imagen seleccionada:', this.imagen);
// }
// agregarCategoria() {
//   if (this.categoriaForm && this.categoriaForm.valid) {
//     const formData = new FormData();
//     formData.append('nombre', this.categoriaForm.get('nombre')?.value || ''); // Pasar el valor del campo 'nombre'
    
//     // Agregar la imagen al FormData si existe
//     if (this.imagen !== null) {
//       formData.append('imagen', this.imagen, this.imagen.name);
//     }
  
//     console.log('Datos enviados al servicio:', formData);
  
//     this.categoriaService.createCategoria(formData).subscribe(
//       data => {
//         console.log('Respuesta del servidor:', data);
//         this.router.navigate(['/categoria']);
//       },
//       error => {
//         console.error('Error al crear categoría:', error);
//       }
//     );
//   }
// }

  
  
  
  
  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Categoria';
      this.categoriaService.getCategoriaById(this.id).subscribe(data => {
        this.categoriaForm.setValue({
          nombre: data.nombre,
          imagen: data.imagen,
        });
      });
    }
  }

}
