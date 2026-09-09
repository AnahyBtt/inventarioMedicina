import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector:'app-layout',
  standalone:true,
  imports:[RouterLink,RouterLinkActive],
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
      <header><div class="search">⌕ <span>Buscar medicamento, paciente...</span></div><div class="user"><span class="bell">🔔</span><span class="avatar">A</span><div><b>Ana</b><small>Administradora</small></div></div></header>
      <section class="content"><ng-content></ng-content></section>
    </main>
  </div>`
})
export class LayoutComponent {}