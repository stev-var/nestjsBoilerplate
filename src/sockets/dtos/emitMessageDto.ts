import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class EmitMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  @IsString()
  eventName: string;

  @IsObject()
  data: object;
}
