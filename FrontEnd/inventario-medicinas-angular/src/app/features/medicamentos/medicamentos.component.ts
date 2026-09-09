import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../core/services/inventario.service';
import { Medicamento } from '../../core/models/models';

@Component({
 selector:'app-medicamentos', standalone:true, imports:[CommonModule,FormsModule],
 template:`
 <div class="page-head"><div><h1>Medicamentos</h1><p>Administra existencias, lotes y fechas de caducidad.</p></div><button class="btn" (click)="mostrarForm=!mostrarForm">＋ Agregar medicamento</button></div>
 <div class="toolbar"><input [(ngModel)]="busqueda" placeholder="🔎  Buscar medicamento..."><select [(ngModel)]="filtro"><option value="">Todos los tipos</option><option>Jarabe</option><option>Tabletas</option><option>Cápsulas</option><option>Antibiótico</option></select></div>
 <section class="card" *ngIf="mostrarForm"><div class="card-head"><h2>Nuevo medicamento</h2><button class="link" (click)="mostrarForm=false">Cerrar</button></div>
 <div class="formgrid"><input [(ngModel)]="nuevo.nombre" placeholder="Nombre"><input [(ngModel)]="nuevo.marca" placeholder="Marca"><input [(ngModel)]="nuevo.tipo" placeholder="Tipo"><input [(ngModel)]="nuevo.presentacion" placeholder="Presentación"><input type="number" [(ngModel)]="nuevo.cantidad" placeholder="Cantidad"><input type="date" [(ngModel)]="nuevo.fechaCaducidad"><input [(ngModel)]="nuevo.lote" placeholder="Lote"></div><button class="btn" (click)="guardar()">Guardar medicamento</button></section>
 <section class="card"><table><thead><tr><th>Medicamento</th><th>Marca</th><th>Tipo</th><th>Presentación</th><th>Cantidad</th><th>Caducidad</th><th>Lote</th><th></th></tr></thead>
 <tbody><tr *ngFor="let m of filtrados"><td><b>{{m.nombre}}</b></td><td>{{m.marca}}</td><td>{{m.tipo}}</td><td>{{m.presentacion}}</td><td><b>{{m.cantidad}}</b></td><td><span [class]="estado(m.fechaCaducidad).clase">{{m.fechaCaducidad | date:'dd/MM/yyyy'}}</span></td><td>{{m.lote}}</td><td><button class="iconbtn" (click)="eliminar(m.id)">🗑️</button></td></tr></tbody></table></section>`
})
export class MedicamentosComponent implements OnInit {
 private service=inject(InventarioService); medicamentos:Medicamento[]=[]; busqueda=''; filtro=''; mostrarForm=false;
 nuevo:any={nombre:'',marca:'',tipo:'',presentacion:'',cantidad:0,fechaCaducidad:'',lote:''};
 ngOnInit(){this.cargar()} cargar(){this.service.getMedicamentos().subscribe(x=>this.medicamentos=x)}
 get filtrados(){return this.medicamentos.filter(m=>(!this.busqueda||`${m.nombre} ${m.marca}`.toLowerCase().includes(this.busqueda.toLowerCase()))&&(!this.filtro||m.tipo===this.filtro||m.presentacion.includes(this.filtro)))}
 guardar(){if(!this.nuevo.nombre)return;this.service.agregarMedicamento(this.nuevo);this.nuevo={nombre:'',marca:'',tipo:'',presentacion:'',cantidad:0,fechaCaducidad:'',lote:''};this.mostrarForm=false;this.cargar()}
 eliminar(id:number){this.service.eliminarMedicamento(id);this.cargar()}
 estado(fecha:string){const dias=(new Date(fecha).getTime()-new Date('2026-09-09').getTime())/86400000;return dias<0?{clase:'pill danger'}:dias<=30?{clase:'pill warn'}:{clase:'pill ok'}}
}