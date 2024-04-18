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

  constructor(private fb: FormBuilder,
              private router: Router,
              private quienesSomosService: SomosService,
              private activatedRoute: ActivatedRoute) {
    this.somosForm = this.fb.group({
      foto: ['', Validators.required],
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

  agregarSomos() {
    if (this.somosForm) {
          const fotoControl = this.somosForm.get('nombre');
         const descripcionControl = this.somosForm.get('imagen');
          
      if (fotoControl && descripcionControl) {
           const somos: somos = {
             foto: fotoControl.value,
             descripcion: descripcionControl.value,
       };

    if (this.id !== null) {
      this.quienesSomosService.editarSomos(this.id, somos).subscribe(data => {
        this.router.navigate(['/']);
      });
    } else {
      this.quienesSomosService.guardarSomos(somos).subscribe(data => {
        this.router.navigate(['/']);
      });
    }
  }
}}

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Quienes Somos';
      this.quienesSomosService.obtenerSomos(this.id).subscribe(data => {
        this.somosForm.setValue({
          foto: data.foto,
          descripcion: data.descripcion,
        });
      });
    }
  }
}
