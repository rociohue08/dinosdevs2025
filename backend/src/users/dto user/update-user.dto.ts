import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly nombre?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;
}