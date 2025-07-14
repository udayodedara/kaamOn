import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: createTransactionDto
    });

    return transaction;
  }

  async findAll() {
    const transactions = await this.prisma.transaction.findMany();
    return transactions;
  }

  async findUserTransactions(userId: number) {
    const wallet = await this.prisma.wallet.findFirst({
      where: { userId },
      select: { id: true }
    });

    if (!wallet) {
      throw new NotFoundException(
        `Wallet for user with ID ${userId} not found`
      );
    }

    const transactions = await this.prisma.transaction.findMany({
      where: { walletId: wallet.id }
    });
    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto
    });

    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
