import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InventarioService } from '../../core/services/inventario.service';
import { Medicamento } from '../../core/models/models';
import { Auth } from '../../core/services/auth/auth';

@Component({
 selector:'app-dashboard', standalone:true, imports:[CommonModule,RouterLink],
 template:`
 <div class="page-head"><div><h1>{{ greeting }}, {{ profile?.given_name || 'Usuario' }} 👋</h1><p>Aquí tienes un resumen de tu inventario.</p></div><a class="btn" routerLink="/medicamentos">＋ Agregar medicamento</a></div>
 <div class="stats">
   <div class="stat"><span class="ico">💊</span><div><small>Medicamentos</small><strong>{{medicamentos.length}}</strong></div></div>
   <div class="stat"><span class="ico orange">⚠️</span><div><small>Próximos a caducar</small><strong>{{proximos}}</strong></div></div>
   <div class="stat"><span class="ico red">❌</span><div><small>Caducados</small><strong>{{caducados}}</strong></div></div>
   <div class="stat"><span class="ico purple">📋</span><div><small>Recetas activas</small><strong>3</strong></div></div>
 </div>
 <div class="grid2">
  <section class="card"><div class="card-head"><h2>⚠️ Próximos a caducar</h2><a routerLink="/medicamentos">Ver todo</a></div>
   <table><thead><tr><th>Medicamento</th><th>Marca</th><th>Presentación</th><th>Cantidad</th><th>Caducidad</th></tr></thead>
   <tbody><tr *ngFor="let m of proximosLista"><td><b>{{m.nombre}}</b></td><td>{{m.marca}}</td><td>{{m.presentacion}}</td><td>{{m.cantidad}}</td><td><span class="pill warn">{{m.fechaCaducidad | date:'dd/MM/yyyy'}}</span></td></tr></tbody></table>
  </section>
  <section class="card"><div class="card-head"><h2>🔔 Recordatorios de hoy</h2><a routerLink="/notificaciones">Ver todos</a></div>
   <div class="reminder"><span>💊</span><div><b>Paracetamol 500 mg</b><small>María López · 14:00</small></div><button>✓</button></div>
   <div class="reminder"><span>💊</span><div><b>Ibuprofeno 400 mg</b><small>María López · 18:00</small></div><button>✓</button></div>
   <div class="reminder"><span>💊</span><div><b>Amoxicilina 500 mg</b><small>Ana García · 20:00</small></div><button>✓</button></div>
  </section>
 </div>`
})
export class DashboardComponent implements OnInit {
 private service=inject(InventarioService); 
 private auth = inject(Auth);
 medicamentos:Medicamento[]=[]; proximos=0; caducados=0; proximosLista:Medicamento[]=[];
 profile: any = null;
 greeting: string = 'Buenos días';

 ngOnInit(){
   this.profile = this.auth.getUserProfile();
   this.setGreeting();

   this.service.getMedicamentos().subscribe(m=>{this.medicamentos=m; const hoy=new Date('2026-09-09'); this.proximosLista=m.filter(x=>{const d=(new Date(x.fechaCaducidad).getTime()-hoy.getTime())/86400000;return d>=0&&d<=90}); this.proximos=this.proximosLista.length; this.caducados=m.filter(x=>new Date(x.fechaCaducidad)<hoy).length;});
 }

 private setGreeting() {
   const hour = new Date().getHours();
   if (hour >= 5 && hour < 12) {
     this.greeting = 'Buenos días';
   } else if (hour >= 12 && hour < 19) {
     this.greeting = 'Buenas tardes';
   } else {
     this.greeting = 'Buenas noches';
   }
 }
}