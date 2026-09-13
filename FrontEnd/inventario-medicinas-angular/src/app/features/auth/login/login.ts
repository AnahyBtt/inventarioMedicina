import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  mfaForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  errorMessage = '';
  loading = false;
  
  // MFA States
  requiresMfa = false;
  mfaSession = '';
  mfaChallengeName = '';
  mfaUsername = '';

  public onLogin(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    
    const { email, password } = this.loginForm.getRawValue();
    this.mfaUsername = email;
    
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        
        if (response.ChallengeName === 'SOFTWARE_TOKEN_MFA' || response.ChallengeName === 'SMS_MFA') {
          this.requiresMfa = true;
          this.mfaSession = response.Session;
          this.mfaChallengeName = response.ChallengeName;
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message || 'Credenciales inválidas o error de conexión.';
        console.error('Login error:', err);
      }
    });
  }

  public onVerifyMfa(): void {
    if (this.mfaForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    
    const { code } = this.mfaForm.getRawValue();
    this.authService.respondToMfaChallenge(this.mfaUsername, code, this.mfaSession, this.mfaChallengeName).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message || 'Código MFA inválido.';
        console.error('MFA error:', err);
      }
    });
  }
}
