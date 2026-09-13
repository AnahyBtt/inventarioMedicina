import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../core/services/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-layout',
  standalone:true,
  imports:[RouterLink,RouterLinkActive, CommonModule],
  template:`
  <div class="shell">
    <aside class="sidebar">
      <div class="brand"><span class="brand-icon">✚</span><div><b>Medicina</b><small>Inventario</small></div></div>
      <nav>
        <a routerLink="/" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active">🏠 <span>Inicio</span></a>
        <a routerLink="/medicamentos" routerLinkActive="active">💊 <span>Medicamentos</span></a>
        <a routerLink="/pacientes" routerLinkActive="active">👩 <span>Pacientes</span></a>
        <a routerLink="/recetas" routerLinkActive="active">📋 <span>Recetas</span></a>
        <a routerLink="/notificaciones" routerLinkActive="active">🔔 <span>Notificaciones</span><em>5</em></a>
      </nav>
      <div class="sidebar-bottom"><a>⚙️ <span>Configuración</span></a></div>
    </aside>
    <main class="main">
      <header>
        <div class="search">⌕ <span>Buscar medicamento, paciente...</span></div>
        <div class="user" *ngIf="profile">
          <span class="bell">🔔</span>
          <span class="avatar">{{ profile.given_name ? profile.given_name.charAt(0).toUpperCase() : 'U' }}</span>
          <div>
            <b>{{ profile.given_name }} {{ profile.family_name }}</b>
            <small>Usuario AWS Cognito</small>
          </div>
          <button class="iconbtn" (click)="logout()" title="Cerrar sesión" style="margin-left: 10px; color: #dc2626; font-size: 16px;">
            🚪
          </button>
        </div>
      </header>
      <section class="content"><ng-content></ng-content></section>
    </main>
  </div>`
})
export class LayoutComponent implements OnInit {
  private auth = inject(Auth);
  profile: any = null;

  ngOnInit(): void {
    this.profile = this.auth.getUserProfile();
  }

  logout() {
    this.auth.logout();
  }
}