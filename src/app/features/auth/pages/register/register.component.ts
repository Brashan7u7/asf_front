import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

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
  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      nombreCompleto: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const formValue = this.usuarioForm.value;

    const nuevoUsuario = {
      nombre: formValue.nombreCompleto,
      ape_paterno: formValue.apellidoPaterno,
      ape_materno: formValue.apellidoMaterno,
      correo: formValue.correo,
      contrasena: formValue.contrasenia,
      rol: false,
    };

    this.usuarioService.createUsuario(nuevoUsuario).subscribe({
      next: (respuesta) => {
        console.log('Usuario registrado', respuesta);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Error al registrar', err);
      },
    });
  }
}
