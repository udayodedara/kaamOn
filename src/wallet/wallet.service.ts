import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallet } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}
  async createWallet(userId: number): Promise<Wallet> {
    const wallet = await this.prisma.wallet.create({
      data: {
        userId: userId
      }
    });

    return wallet;
  }

  async getWalletByUserId(userId: number): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findFirst({
      where: { userId: userId }
    });

    if (!wallet) {
      throw new NotFoundException(
        `Wallet for user with ID ${userId} not found`
      );
    }

    return wallet;
  }
}
