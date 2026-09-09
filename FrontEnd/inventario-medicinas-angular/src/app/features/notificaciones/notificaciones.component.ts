import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
 selector:'app-notificaciones', standalone:true, imports:[CommonModule],
 template:`<div class="page-head"><div><h1>Notificaciones</h1><p>Alertas de inventario y recordatorios de pacientes.</p></div></div>
 <div class="notice-grid">
  <div class="notice danger"><span>❌</span><div><b>Medicamento caducado</b><p>Revisa los medicamentos que ya superaron su fecha de caducidad.</p><small>Inventario · Hoy</small></div></div>
  <div class="notice warn"><span>⚠️</span><div><b>Ambroxol caduca pronto</b><p>Mucosolvan · 8 unidades · caduca el 22/09/2026.</p><small>Inventario · Hoy</small></div></div>
  <div class="notice info"><span>💊</span><div><b>Recordatorio de medicamento</b><p>María López debe tomar Paracetamol 500 mg a las 14:00.</p><small>Paciente · Hoy</small></div></div>
  <div class="notice info"><span>📋</span><div><b>Receta próxima a finalizar</b><p>La receta de Ana García finaliza el 16/09/2026.</p><small>Recetas · Hoy</small></div></div>
 </div>`
})
export class NotificacionesComponent {}