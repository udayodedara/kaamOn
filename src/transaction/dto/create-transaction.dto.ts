import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { TransactionStatus, TransactionType } from 'generated/prisma';

export class CreateTransactionDto {
  @IsNumber()
  @Min(10)
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsNumber()
  @IsNotEmpty()
  walletId: number;

  @IsNumber()
  taskId?: number;
}
