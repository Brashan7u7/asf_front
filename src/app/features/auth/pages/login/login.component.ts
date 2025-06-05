import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  cargando = false;
  showPassword = false;

  login() {
    this.error = '';
    this.cargando = true;
  }
}
