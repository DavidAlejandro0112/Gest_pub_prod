import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({ description: 'Post'})
    @IsString()
    post:string;
}
