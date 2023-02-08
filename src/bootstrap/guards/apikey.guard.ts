import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Get x-api-key from header
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      throw new UnauthorizedException('Missing x-api-key header');
    }
    console.log('apiKey', apiKey);
    // Validate the value of the Authorization header.
    // You can use a library such as jsonwebtoken to validate the token.
    // If the token is valid, return true. Otherwise, return false.

    return true;
  }
}
