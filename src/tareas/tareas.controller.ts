import { Controller, Get, Post, Delete, Req, Put } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { Param, Body } from '@nestjs/common';
import { tareasDTO } from './DTO/tareasDTO';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request } from 'express';
import { EstadoTarea } from './tareas.model';

@Controller('tareas')
export class TareasController {
  constructor(private tareaSvc: TareasService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  GetTareas(@Req() req: Request) {
    return this.tareaSvc.getAllTareas(req);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getTarea(@Param('id') id: number) {
    id = Number(id);
    return this.tareaSvc.getTarea(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTarea(@Body() tarea: tareasDTO, @Req() req: Request) {
    return this.tareaSvc.createTareas(tarea, req);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteTarea(@Param('id') id: number) {
    id = Number(id);
    return this.tareaSvc.deleteTarea(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put('change/:id')
  changeEstado(@Param('id') id: number, @Body() estado: EstadoTarea) {
    const newEstado = estado['estado'];
    id = Number(id);
    return this.tareaSvc.changeEstado(newEstado, id);
  }
}
