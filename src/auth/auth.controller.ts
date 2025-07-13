import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { WalletService } from 'src/wallet/wallet.service';
import { SkipAuth } from 'src/common/decorators/skipAuth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly walletService: WalletService
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);

    await this.walletService.createWallet(user.id);

    return user;
  }

  @SkipAuth()
  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto);
  }
}
