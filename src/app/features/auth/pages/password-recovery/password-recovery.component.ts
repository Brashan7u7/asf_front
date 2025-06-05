import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  imports: [FormsModule],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss',
})
export class PasswordRecoveryComponent {
  forgotPassword() {}
  email = '';
  cargando = false;

}
