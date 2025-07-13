import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Min(10)
  @IsNumber()
  baseAmount: number;

  @IsNumber()
  @IsNotEmpty()
  creatorId: number;

  @IsString()
  @IsNotEmpty()
  location: string;
}
