import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProductDto {

    
    @ApiProperty({ description: 'Producto'})
    @IsString()
    product:string;
}
