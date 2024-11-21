import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class RegisterDto{
    @ApiProperty({ description: 'nombre', example: 'David'})
    @Transform(({value}) =>value.trim())
    @IsString()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
    @MaxLength(8, { message: 'El nombre no puede exceder los 8 caracteres.' })
    name:string;

    // user:string;
    @ApiProperty({ description: 'email', example: 'text@text.com'})
    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    email:string;
    
    @ApiProperty({ description: 'password', example: '123123'})
    @Transform(({value}) =>value.trim())
    @IsStrongPassword({
        minLength: 6, 
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password:string;

}