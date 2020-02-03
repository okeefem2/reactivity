import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { bindNodeCallback, Observable, of } from 'rxjs';
import { jwtConstants } from './constants';
import * as jwt from 'jsonwebtoken';
import { catchError, flatMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '@reactivity/model';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    protected readonly authService: AuthService,
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const data = context.switchToWs().getData();
    const authHeader = data.headers.authorization;
    console.log('auth header', authHeader);
    const authToken = authHeader.substring(7, authHeader.length);
    const { username, password } = jwt.verify(authToken, jwtConstants.secret, null) as any;

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('User is unauthorized in ws strategy');
    }
    return true;
  }
}
