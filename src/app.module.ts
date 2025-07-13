import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AuthModule, UserModule, WalletModule, TaskModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
