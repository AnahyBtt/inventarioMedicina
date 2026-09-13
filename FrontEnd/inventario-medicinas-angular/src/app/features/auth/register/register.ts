import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(Auth);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    given_name: ['', Validators.required],
    family_name: ['', Validators.required],
    birthdate: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  errorMessage = '';
  loading = false;

  public onRegister(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    
    const user = this.registerForm.getRawValue();
    this.authService.registerUser(user).subscribe({
      next: () => {
        this.loading = false;
        // Pasa el email por query params para la pantalla de verificación
        this.router.navigate(['/verificar'], { queryParams: { email: user.email } });
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message || 'Error al registrar usuario.';
        console.error('Register error:', err);
      }
    });
  }
}
