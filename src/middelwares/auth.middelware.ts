import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('auth-user');
    if (!token) {
      throw new UnauthorizedException('Accès refusé');
    }

    try {
      const decoded = verify(token, '8Xn8@z&A3Bv%vG4#*E$z');
      req['userId'] = decoded['userId'];
      next();
    } catch (error) {
      throw new UnauthorizedException('Accès refusé');
    }
  }
}