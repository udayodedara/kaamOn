import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [WalletController],
  providers: [
    WalletService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  exports: [WalletService] // Exporting WalletService to be used in other modules
})
export class WalletModule {}
