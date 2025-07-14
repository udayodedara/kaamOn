import { IsNumber, Min } from 'class-validator';

export class AddBalanceDto {
  @Min(10)
  @IsNumber()
  amount: number;
}
