import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  mail = '';
  password = '';
  error = '';
  cargando = false;
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.cargando = true;

    this.authService.login(this.mail, this.password).subscribe({
      next: (response) => {
        this.cargando = false;
        this.router.navigate(['/private/audit']);
      },
      error: (error) => {
        this.error =
          'Error al iniciar sesión: ' + (error.message || 'Error desconocido');
        this.cargando = false;
      },
    });
  }
}
