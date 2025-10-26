import { IsString, MinLength } from 'class-validator';
import { EstadoTarea } from '../tareas.model';

export class tareasDTO {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsString()
  @MinLength(5)
  descripcion: string;

  @IsString()
  estado: EstadoTarea;
}
