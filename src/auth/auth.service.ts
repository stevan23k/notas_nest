import { HttpException, Injectable } from '@nestjs/common';
import { loginDTO } from './dto/loginDTO';
import { registerDTO } from './dto/registerDTO';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { Request } from 'express';
import { Payload } from 'src/models/payload.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  private users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
    },
    {
      id: 2,
      username: 'pedro',
      password: '$2b$10$.j9BpR7bJfq9ckVjaWeUEOe6mG8KuRWcA6UQ86LSnrPtVX.yRQKlq',
    },
  ];

  register(user: registerDTO) {
    const passwordHash = hashSync(user.password, 10);

    const newUser = {
      username: user.username,
      password: passwordHash,
    };

    const createUser = this.users.push({
      id: this.users.length + 1,
      username: newUser.username,
      password: newUser.password,
    });

    if (!createUser) {
      return { mensaje: 'error' };
    }

    return { mensaje: 'usuario registrado', newUser };
  }

  async login(user: loginDTO) {
    const usuario = this.users.find((u) => u.username === user.username);

    if (!usuario) {
      throw new HttpException('Invalid credential', 401);
    }

    const result = compareSync(user.password, usuario?.password);

    if (result) {
      const payload = {
        nombre: usuario.username,
        sub: usuario.id,
      };
      return {
        login: 'inicio exitoso',
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new HttpException('Invalid credential', 401);
    }
  }

  getUser(req: Request) {
    const token = req['user'] as Payload;
    return { nombre: token.nombre };
  }
}
