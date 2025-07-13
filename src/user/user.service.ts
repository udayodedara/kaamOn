import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from 'generated/prisma';
import { BcryptUtil } from 'src/common/utils/bcrypt.util';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await BcryptUtil.hashPassword(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        contactNumber: createUserDto.contactNumber,
        address: createUserDto.address,
        password: hashPassword
      }
    });

    return user;
  }

  async findAll() {
    const list = await this.prisma.user.findMany({
      select: {
        id: true, // Include ID if needed
        uuid: true,
        firstName: true,
        lastName: true,
        email: true,
        contactNumber: true,
        address: true,
        rating: true,
        isUserVerified: true
      }
    });
    return list;
  }

  async findOne(uuid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uuid },
      select: {
        id: true,
        uuid: true,
        firstName: true,
        lastName: true,
        email: true,
        contactNumber: true,
        address: true,
        rating: true,
        isUserVerified: true,
        wallet: {
          select: {
            id: true,
            balance: true,
            uuid: true,
            totalEarned: true,
            totalSpent: true,
            totalWithdrawn: true
          }
        }
      }
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
