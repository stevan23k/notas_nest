import { Controller, Get, Post, Delete, Req } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { Param, Body } from '@nestjs/common';
import { tareasDTO } from './DTO/tareasDTO';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request } from 'express';

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
  @Get('complete/:id')
  completeTarea(@Param('id') id: number) {
    id = Number(id);
    return this.tareaSvc.completeTarea(id);
  }
}
