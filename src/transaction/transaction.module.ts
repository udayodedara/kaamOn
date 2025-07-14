import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class TransactionModule {}
