import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateWorkshopDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  customerName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  productName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  region: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  meters: number;
}
