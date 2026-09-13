import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Verify } from './features/auth/verify/verify';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MedicamentosComponent } from './features/medicamentos/medicamentos.component';
import { PacientesComponent } from './features/pacientes/pacientes.component';
import { RecetasComponent } from './features/recetas/recetas.component';
import { NotificacionesComponent } from './features/notificaciones/notificaciones.component';

export const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'medicamentos', component: MedicamentosComponent, canActivate: [authGuard]},
  {path: 'pacientes', component: PacientesComponent, canActivate: [authGuard]},
  {path: 'recetas', component: RecetasComponent, canActivate: [authGuard]},
  {path: 'notificaciones', component: NotificacionesComponent, canActivate: [authGuard]},
  {path: 'login', component: Login},
  {path: 'registro', component: Register},
  {path: 'verificar', component: Verify},
  {path: '**', redirectTo: ''}
];