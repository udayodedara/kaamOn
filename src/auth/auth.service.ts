import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptUtil } from 'src/common/utils/bcrypt.util';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async login(loginDto: {
    email: string;
    password: string;
  }): Promise<{ authToken: string }> {
    const user = await this.userService.findByEmail(loginDto.email);
    const isPasswordCorrect = await BcryptUtil.comparePassword(
      loginDto.password,
      user.password
    ); // In a real application, you would hash the password

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email }; // Create a payload for JWT
    return {
      authToken: await this.jwtService.signAsync(payload)
    };
  }
}
