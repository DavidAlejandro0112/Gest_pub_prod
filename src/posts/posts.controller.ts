import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Post') 
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  @ApiOperation({
    summary: 'Crear producto',
    description: 'Crear un nuevo producto'
  })
  @ApiBody({type: CreatePostDto})
  @ApiResponse({status: 201, description: 'The user has been successfully created.'})
  @ApiResponse({status: 400, description: 'Bad Request.'})
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Mostrar todo',
    description: 'Muestra todos los productos en la base de datos'
  })
  findAll() {
    return this.postsService.findAll();
  }
  @ApiOperation({
    summary: 'Muestra un producto por el id',
    description: 'muestra un producto cuando se le pasa por parametros el id'
  })
  //@ApiBody({type: id})
  @ApiParam({name: 'id', required: true, description: 'ID User'})
  @ApiQuery({name: 'offset', required: false, type: Number, description: 'Numero de registros a omitir', example: 0})
  @ApiQuery({name: 'limit', required: false, type: Number, description: 'Numero maximo que va a retornar.', example: 10})
  @ApiQuery({name: 'search', required: false, type: String, description: 'No dejar espacios en blanco.', example: ''}) 
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }
  @ApiOperation({
    summary: 'Modificar una publicacion por el id',
    description: 'Modificar una publicacion cuando se le pasa por parametros el id'
  })
  //@ApiBody({type: id})
  @ApiParam({name: 'id', required: true, description: 'ID User'})
  @ApiQuery({name: 'offset', required: false, type: Number, description: 'Numero de registros a omitir', example: 0})
  @ApiQuery({name: 'limit', required: false, type: Number, description: 'Numero maximo que va a retornar.', example: 10})
  @ApiQuery({name: 'search', required: false, type: String, description: 'No dejar espacios en blanco.', example: ''}) 
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }
  @ApiOperation({
    summary: 'Eliminar una publicacion por el id',
    description: 'Eliminar una publicacion logicamente cuando se le pasa por parametros el id'
  })
  //@ApiBody({type: id})
  @ApiParam({name: 'id', required: true, description: 'ID'})
  // @ApiQuery({name: 'offset', required: false, type: Number, description: 'Numero de registros a omitir', example: 0})
  // @ApiQuery({name: 'limit', required: false, type: Number, description: 'Numero maximo que va a retornar.', example: 10})
  // @ApiQuery({name: 'search', required: false, type: String, description: 'No dejar espacios en blanco.', example: ''}) 
  @ApiResponse({ status: 204, description: 'Post deleted successfully.' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
