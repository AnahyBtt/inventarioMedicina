import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../core/services/inventario.service';
import { Receta } from '../../core/models/models';

@Component({
 selector:'app-recetas', standalone:true, imports:[CommonModule,FormsModule],
 template:`<div class="page-head"><div><h1>Recetas</h1><p>Da de alta tratamientos y activa recordatorios para los pacientes.</p></div><button class="btn" (click)="mostrar=!mostrar">＋ Nueva receta</button></div>
 <section class="card" *ngIf="mostrar"><div class="card-head"><h2>Alta de receta</h2></div>
 <div class="formgrid"><select [(ngModel)]="nueva.pacienteId"><option value="">Selecciona paciente</option><option *ngFor="let p of pacientes" [value]="p.id">{{p.nombre}}</option></select><input [(ngModel)]="nueva.paciente" placeholder="Nombre del paciente"><input [(ngModel)]="nueva.medicamento" placeholder="Medicamento"><input [(ngModel)]="nueva.dosis" placeholder="Dosis"><input [(ngModel)]="nueva.frecuencia" placeholder="Frecuencia (ej. cada 8 horas)"><input type="date" [(ngModel)]="nueva.fechaInicio"><input type="date" [(ngModel)]="nueva.fechaFin"></div>
 <label class="check"><input type="checkbox" [(ngModel)]="recordatorios"> 🔔 Activar recordatorios para el paciente</label><button class="btn" (click)="guardar()">Guardar receta</button></section>
 <section class="card"><div class="card-head"><h2>Recetas activas</h2></div><table><thead><tr><th>Paciente</th><th>Medicamento</th><th>Dosis</th><th>Frecuencia</th><th>Periodo</th><th>Estado</th></tr></thead><tbody><tr *ngFor="let r of recetas"><td><b>{{r.paciente}}</b></td><td>{{r.medicamento}}</td><td>{{r.dosis}}</td><td>{{r.frecuencia}}</td><td>{{r.fechaInicio | date:'dd/MM'}} - {{r.fechaFin | date:'dd/MM/yyyy'}}</td><td><span class="pill ok">{{r.estado}}</span></td></tr></tbody></table></section>`
})
export class RecetasComponent implements OnInit {
 private service=inject(InventarioService); recetas:Receta[]=[]; pacientes:any[]=[]; mostrar=false; recordatorios=true;
 nueva:any={pacienteId:'',paciente:'',medicamento:'',dosis:'',frecuencia:'',fechaInicio:'',fechaFin:''};
 ngOnInit(){this.cargar();this.service.getPacientes().subscribe(x=>this.pacientes=x)}
 cargar(){this.service.getRecetas().subscribe(x=>this.recetas=x)}
 guardar(){const p=this.pacientes.find(x=>x.id==this.nueva.pacienteId);this.nueva.paciente=p?.nombre||this.nueva.paciente;if(!this.nueva.paciente||!this.nueva.medicamento)return;this.service.agregarReceta(this.nueva);this.cargar();this.mostrar=false}
}