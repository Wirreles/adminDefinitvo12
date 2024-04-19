import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { sorteo } from 'src/app/models/sorteo';
import { SorteoService } from 'src/app/services/sorteo.service';

@Component({
  selector: 'app-loteryes',
  templateUrl: './loteryes.component.html',
  styleUrls: ['./loteryes.component.scss'],
})
export class SorteosComponent implements OnInit {
  loteryForm: FormGroup;
  fotoPerfil: File | null = null;
  titulo = 'Crear Sorteo';
  id: string | null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _sorteoService: SorteoService,
    private aRouter: ActivatedRoute
  ) {
    this.loteryForm = this.fb.group({
      imagen: ['', Validators.required],
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
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

  agregarSorteo(): void {
    const titulo = this.loteryForm.get('titulo')?.value;
    const nombre = this.loteryForm.get('nombre')?.value;
    const fecha = this.loteryForm.get('fecha')?.value;
    const descripcion = this.loteryForm.get('descripcion')?.value;

    if (nombre && this.fotoPerfil && titulo && fecha && descripcion) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('imagen', this.fotoPerfil);
      formData.append('titulo', titulo);
      formData.append('fecha', fecha);
      formData.append('descripcion', descripcion);

      this._sorteoService.createSorteoWithImage(formData).subscribe({
        next: (response) => {
          console.log('Sorteo creada correctamente:', response);
          this.router.navigate(['/lotery']);
        },
        error: (err) => {
          console.error('Error al crear el sorteo:', err);
          // Manejar el error según sea necesario
        },
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Sorteo';
      this._sorteoService.obtenerSorteo(this.id).subscribe((data) => {
        this.loteryForm.setValue({
          imagen: data.imagen,
          titulo: data.titulo,
          nombre: data.nombre,
          fecha: data.fecha,
          descripcion: data.descripcion,
        });
      });
    }
  }
}
