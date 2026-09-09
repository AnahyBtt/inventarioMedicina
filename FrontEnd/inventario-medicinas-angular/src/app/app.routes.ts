import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MedicamentosComponent } from './features/medicamentos/medicamentos.component';
import { PacientesComponent } from './features/pacientes/pacientes.component';
import { RecetasComponent } from './features/recetas/recetas.component';
import { NotificacionesComponent } from './features/notificaciones/notificaciones.component';

export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'medicamentos', component: MedicamentosComponent},
  {path: 'pacientes', component: PacientesComponent},
  {path: 'recetas', component: RecetasComponent},
  {path: 'notificaciones', component: NotificacionesComponent},
  {path: '**', redirectTo: ''}
];