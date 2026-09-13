import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify.html',
  styleUrl: './verify.css',
})
export class Verify implements OnInit {
  private authService = inject(Auth);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = '';
  errorMessage = '';
  loading = false;

  verifyForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  public onVerify(): void {
    if (this.verifyForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    
    const { code } = this.verifyForm.getRawValue();
    this.authService.confirmRegistration(this.email, code).subscribe({
      next: () => {
        this.loading = false;
        alert('Cuenta verificada exitosamente. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message || 'Código inválido o expirado.';
        console.error('Verify error:', err);
      }
    });
  }
}
