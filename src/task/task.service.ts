import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma.service';
// import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: number, createTaskDto: CreateTaskDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const wallet = await this.prisma.wallet.findFirst({
      where: { userId: user.id },
      select: { balance: true, id: true }
    });

    if (!wallet) {
      throw new NotFoundException(
        `Wallet for user with ID ${userId} not found`
      );
    }

    if (wallet && wallet.balance < createTaskDto.baseAmount) {
      throw new BadRequestException(`Insufficient balance in wallet`);
    }

    const newTask = await this.prisma.$transaction(async (tx) => {
      const task = await tx.task.create({
        data: {
          title: createTaskDto.title,
          description: createTaskDto.description,
          baseAmount: createTaskDto.baseAmount,
          creatorId: user.id,
          location: createTaskDto.location
        }
      });

      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: {
            decrement: createTaskDto.baseAmount
          },
          totalSpent: {
            increment: createTaskDto.baseAmount
          }
        }
      });

      await tx.transaction.create({
        data: {
          amount: createTaskDto.baseAmount,
          type: 'DEBIT',
          paymentMethod: 'WALLET',
          walletId: wallet.id,
          taskId: task.id,
          status: 'SUCCESS'
        }
      });

      return task;
    });

    return newTask;
  }

  findAll() {
    const list = this.prisma.task.findMany();
    return list;
  }

  async findUserTasks(userId: number) {
    const list = await this.prisma.task.findMany({
      where: { creatorId: userId }
    });

    return list;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
