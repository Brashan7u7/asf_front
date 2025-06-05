import { Routes } from '@angular/router';
import { LoginComponent } from '../../features/auth/pages/login/login.component';
import { RegisterComponent } from '../../features/auth/pages/register/register.component';
import { PasswordRecoveryComponent } from '../../features/auth/pages/password-recovery/password-recovery.component';
export default [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'passwordrecovery',
    component: PasswordRecoveryComponent,
  },
] as Routes;
