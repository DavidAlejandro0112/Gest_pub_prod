import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({ description:'email'})
    @IsEmail()
    email: string;
    @ApiProperty({ description:'password'})
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    password: string;
}