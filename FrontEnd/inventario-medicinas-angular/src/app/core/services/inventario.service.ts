import { Injectable } from '@angular/core';
import { Medicamento, Paciente, Receta } from '../models/models';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class InventarioService {
  private medicamentos: Medicamento[] = [
    {id: 1, nombre:'Paracetamol', marca:'Tempra', tipo:'Analgésico', presentacion:'Tabletas 500 mg', cantidad:25, fechaCaducidad:'2026-09-15', lote:'TMP-2501'},
    {id: 2, nombre:'Ambroxol', marca:'Mucosolvan', tipo:'Jarabe', presentacion:'Jarabe 120 ml', cantidad:8, fechaCaducidad:'2026-09-22', lote:'MUC-4412'},
    {id: 3, nombre:'Ibuprofeno', marca:'Advil', tipo:'Analgésico', presentacion:'Cápsulas 400 mg', cantidad:30, fechaCaducidad:'2026-11-15', lote:'ADV-8891'},
    {id: 4, nombre:'Amoxicilina', marca:'Amoxil', tipo:'Antibiótico', presentacion:'Cápsulas 500 mg', cantidad:40, fechaCaducidad:'2027-03-10', lote:'AMX-5520'}
  ];
  private pacientes: Paciente[] = [
    {id:1,nombre:'María López',edad:35,telefono:'55 1234 5678',recetasActivas:2,proximaToma:'14:00'},
    {id:2,nombre:'Ana García',edad:42,telefono:'55 9876 1234',recetasActivas:1,proximaToma:'18:00'}
  ];
  private recetas: Receta[] = [
    {id:1,pacienteId:1,paciente:'María López',medicamento:'Paracetamol 500 mg',dosis:'1 tableta',frecuencia:'Cada 8 horas',fechaInicio:'2026-09-08',fechaFin:'2026-09-12',estado:'Activa'},
    {id:2,pacienteId:1,paciente:'María López',medicamento:'Ibuprofeno 400 mg',dosis:'1 cápsula',frecuencia:'Cada 12 horas',fechaInicio:'2026-09-08',fechaFin:'2026-09-15',estado:'Activa'},
    {id:3,pacienteId:2,paciente:'Ana García',medicamento:'Amoxicilina 500 mg',dosis:'1 cápsula',frecuencia:'Cada 8 horas',fechaInicio:'2026-09-09',fechaFin:'2026-09-16',estado:'Activa'}
  ];

  getMedicamentos(): Observable<Medicamento[]> { return of(this.medicamentos); }
  getPacientes(): Observable<Paciente[]> { return of(this.pacientes); }
  getRecetas(): Observable<Receta[]> { return of(this.recetas); }

  agregarMedicamento(m: Omit<Medicamento,'id'>): void {
    this.medicamentos.push({...m, id: Date.now()});
  }
  eliminarMedicamento(id:number): void {
    this.medicamentos = this.medicamentos.filter(x => x.id !== id);
  }
  agregarReceta(r: Omit<Receta,'id'|'estado'>): void {
    this.recetas.push({...r,id:Date.now(),estado:'Activa'});
  }
}