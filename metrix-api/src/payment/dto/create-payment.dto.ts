import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreatePaymetDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;
}
