import { IsEnum, IsNotEmpty, IsObject } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Types } from 'mongoose';
import { CACHE_TYPE } from '../Enums/cache.enum';

export class GetCacheDto {
  @IsNotEmpty()
  @IsObjectId({ message: 'Invalid user id' })
  user: Types.ObjectId;

  @IsEnum(CACHE_TYPE)
  @IsNotEmpty()
  type: CACHE_TYPE;
}
export class SetCacheDto {
  @IsNotEmpty()
  @IsObjectId({ message: 'Invalid user id' })
  user: Types.ObjectId | string;

  @IsEnum(CACHE_TYPE)
  @IsNotEmpty()
  type: CACHE_TYPE;

  @IsObject()
  @IsNotEmpty()
  data: object;
}
