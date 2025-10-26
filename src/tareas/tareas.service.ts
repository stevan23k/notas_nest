import { Injectable } from '@nestjs/common';
import { Tarea } from './tareas.model';
import { EstadoTarea } from './tareas.model';
import { Request } from 'express';
import { Payload } from 'src/models/payload.model';

@Injectable()
export class TareasService {
  private tareas: Tarea[] = [
    {
      id: 1,
      nombre: 'Comprar alimentos',
      descripcion: 'Comprar frutas, verduras y pan',
      estado: EstadoTarea.completada,
      UserID: 2,
    },
    {
      id: 2,
      nombre: 'Lavar el coche',
      descripcion: 'Lavar el coche el sábado por la mañana',
      estado: EstadoTarea.enProgreso,
      UserID: 2,
    },
    {
      id: 3,
      nombre: 'Estudiar para el examen',
      descripcion: 'Repasar los apuntes y hacer ejercicios',
      estado: EstadoTarea.eliminada,
      UserID: 1,
      deletedAt: new Date(),
    },
  ];

  getAllTareas(): Tarea[] {
    return this.tareas;
  }

  getTarea(id: number): Tarea {
    console.log('ID recibido en el servicio:', id);
    return this.tareas.find((tarea) => tarea.id === id)!;
  }

  createTareas(tarea: Tarea, req: Request): Tarea {
    const tokenUser = req['user'] as Payload;
    const userID = tokenUser.sub;

    const newTarea: Tarea = {
      id: this.tareas.length + 1,
      ...tarea,
      UserID: userID,
    };
    this.tareas.push(newTarea);
    return newTarea;
  }
}
