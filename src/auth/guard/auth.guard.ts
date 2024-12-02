import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1]; // Asumiendo que el formato es "Bearer <token>"

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  } 
  }