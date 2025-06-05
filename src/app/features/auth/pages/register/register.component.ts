import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  usuarioForm: FormGroup;
  showPassword: boolean = false;
  cargando: boolean = false;
  constructor(private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      curp: ['', [Validators.required]],
      nombreCompleto: [''],
      sexo: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      edad: [null, [Validators.required, Validators.min(0)]],
    });
  }
  onSubmit() {}
}
