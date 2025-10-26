import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TareasService } from './tareas/tareas.service';
import { TareasController } from './tareas/tareas.controller';
import { TareasModule } from './tareas/tareas.module';

@Module({
  imports: [AuthModule, TareasModule],
  controllers: [TareasController],
  providers: [TareasService],
})
export class AppModule {}
