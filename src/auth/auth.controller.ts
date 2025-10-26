import { Controller, UseGuards } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { registerDTO } from './dto/registerDTO';
import { loginDTO } from './dto/loginDTO';
import type { Response, Request } from 'express';
import { Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { Get, Req } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() user: registerDTO) {
    return this.authService.register(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: loginDTO, @Res() res: Response) {
    const response = await this.authService.login(user);
    res.cookie('token', response.access_token, {
      httpOnly: true,
      secure: false, // cámbialo a true si usas HTTPS
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    return res.json({
      login: 'login exitoso',
      access_token: response.access_token,
    });
  }

  @UseGuards(AuthGuard)
  @Get('check')
  check(@Req() req: Request): any {
    console.log(req.cookies); // 👈 aquí llega la cookie
    return req.cookies;
  }
}
