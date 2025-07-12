import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }
  async registerUser(registerDto: RegisterDto): Promise<string> {
    console.log('registerDto', registerDto);

    // const user = 

    return 'user registered';
  }
}
