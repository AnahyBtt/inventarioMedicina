import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, CommonModule],
  template: `
    <app-layout *ngIf="!isLoginPage()">
      <router-outlet />
    </app-layout>
    <router-outlet *ngIf="isLoginPage()" />
  `
})
export class AppComponent {
  private router = inject(Router);

  isLoginPage(): boolean {
    const url = this.router.url;
    return url.startsWith('/login') || url.startsWith('/registro') || url.startsWith('/verificar');
  }
}