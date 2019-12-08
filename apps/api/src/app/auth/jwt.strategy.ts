import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { User } from '@reactivity/model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // Invoked with the decoded jwt once it has been verified. If it is invalid a 401 will be thrown previous
  // to this being invoked
  async validate(payload: any): Promise<User> {
    return { id: payload.sub, username: payload.username, email: payload.email };
  }
}
