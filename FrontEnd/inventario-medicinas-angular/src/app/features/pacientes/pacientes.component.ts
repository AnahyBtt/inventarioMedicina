import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../core/services/inventario.service';
import { Paciente } from '../../core/models/models';

@Component({
 selector:'app-pacientes', standalone:true, imports:[CommonModule],
 template:`<div class="page-head"><div><h1>Pacientes</h1><p>Consulta pacientes y sus recetas activas.</p></div><button class="btn">＋ Nuevo paciente</button></div>
 <section class="card"><table><thead><tr><th>Paciente</th><th>Edad</th><th>Teléfono</th><th>Recetas activas</th><th>Próxima toma</th><th>Estado</th></tr></thead>
 <tbody><tr *ngFor="let p of pacientes"><td><div class="person"><span>{{p.nombre.charAt(0)}}</span><b>{{p.nombre}}</b></div></td><td>{{p.edad}}</td><td>{{p.telefono}}</td><td>{{p.recetasActivas}}</td><td>{{p.proximaToma}}</td><td><span class="pill ok">Activo</span></td></tr></tbody></table></section>`
})
export class PacientesComponent implements OnInit {private service=inject(InventarioService);pacientes:Paciente[]=[];ngOnInit(){this.service.getPacientes().subscribe(x=>this.pacientes=x)}}