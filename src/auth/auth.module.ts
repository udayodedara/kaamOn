import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [UserModule, WalletModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
