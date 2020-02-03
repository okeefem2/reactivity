import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@reactivity/model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<User> {
    const payload = { username: user.username, sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);
    const fullUser = await this.usersService.getProfile(user.username);
    return { ...fullUser, access_token };
  }

  async createUser(username: string, pass: string, email: string): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return this.usersService.insert({ username, password: hash, email });
  }
}
