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
  async create(createTaskDto: CreateTaskDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createTaskDto.creatorId }
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createTaskDto.creatorId} not found`
      );
    }

    const wallet = await this.prisma.wallet.findFirst({
      where: { userId: createTaskDto.creatorId },
      select: { balance: true }
    });

    if (wallet && wallet.balance < createTaskDto.baseAmount) {
      throw new BadRequestException(`Insufficient balance in wallet`);
    }

    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        baseAmount: createTaskDto.baseAmount,
        creatorId: createTaskDto.creatorId,
        location: createTaskDto.location
      }
    });
    return task;
  }

  findAll() {
    return `This action returns all task`;
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
