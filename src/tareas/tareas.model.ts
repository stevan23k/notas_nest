export enum EstadoTarea {
  completada = 'completada',
  enProgreso = 'en progreso',
  eliminada = 'eliminada',
  pendiente = 'pendiente',
}

export interface Tarea {
  id?: number;
  nombre: string;
  descripcion: string;
  estado: EstadoTarea;
  UserID?: number;
  deletedAt?: Date;
}
