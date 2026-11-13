import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateWorkshopDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  meters: number;
}
