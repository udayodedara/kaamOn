import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from './types/jwt-payload.type';
import { Reflector } from '@nestjs/core';
import { SKIP_AUTH_KEY } from 'src/common/decorators/skipAuth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const shouldSkipAuth = this.reflector.getAllAndOverride<boolean>(
      SKIP_AUTH_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (shouldSkipAuth) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found in request headers');
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: 'your_jwt_secret' // Replace with your actual secret
      });
      if (!payload) {
        throw new UnauthorizedException();
      }
      request['user'] = payload;
    } catch {
      throw new BadRequestException(
        'Invalid token or token expired. Please log in again.'
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
