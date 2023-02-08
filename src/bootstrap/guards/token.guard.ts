import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt = require('jsonwebtoken');

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      return false;
    }
    // Validate the value of the Authorization header.
    // You can use a library such as jsonwebtoken to validate the token.
    // If the token is valid, return true. Otherwise, return false.
    const token = authorization.split(' ')[1];
    const decodedJwt = jwt.decode(token as string, { complete: true });
    if (!decodedJwt) {
      console.log('Not a valid JWT token');
      return false;
    }
    request.user = decodedJwt.payload as jwt.JwtPayload;
    return true;
  }
}
