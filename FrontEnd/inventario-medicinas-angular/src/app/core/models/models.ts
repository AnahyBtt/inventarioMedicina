export interface Medicamento {
  id: number;
  nombre: string;
  marca: string;
  tipo: string;
  presentacion: string;
  cantidad: number;
  fechaCaducidad: string;
  lote: string;
}

export interface Paciente {
  id: number;
  nombre: string;
  edad: number;
  telefono: string;
  recetasActivas: number;
  proximaToma?: string;
}

export interface Receta {
  id: number;
  pacienteId: number;
  paciente: string;
  medicamento: string;
  dosis: string;
  frecuencia: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'Activa' | 'Finalizada';
}