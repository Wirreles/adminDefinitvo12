import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SomosService } from 'src/app/services/quienesSomos.service';
import { somos } from 'src/app/models/quienesSomos';

@Component({
  selector: 'app-quienesSomo',
  templateUrl: './quienesSomos.component.html',
  styleUrls: ['./quienesSomos.component.scss'],
})
export class SomosComponent implements OnInit {
  somosForm: FormGroup;
  titulo = 'Crear Quienes Somos';
  id: string | null;
  fotoPerfil: File | null = null; 
  constructor(private fb: FormBuilder,
              private router: Router,
              private quienesSomosService: SomosService,
              private activatedRoute: ActivatedRoute) {
    this.somosForm = this.fb.group({
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required]
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
  agregarSomos(): void {
    const nombre = this.somosForm.get('nombre')?.value;

    if (nombre && this.fotoPerfil) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('imagen', this.fotoPerfil);

        console.log('FormData:', formData);

      this.quienesSomosService.createSomosWithImage(formData).subscribe({
        next: (response) => {
          console.log('Categoría creada correctamente:', response);
          this.router.navigate(['/categoria']);
        },
        error: (err) => {
          console.error('Error al crear la categoría:', err);
          // Manejar el error según sea necesario
        }
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Quienes Somos';
      this.quienesSomosService.obtenerSomos(this.id).subscribe(data => {
        this.somosForm.setValue({
          imagen: data.imagen,
          descripcion: data.descripcion,
        });
      });
    }
  }
}
