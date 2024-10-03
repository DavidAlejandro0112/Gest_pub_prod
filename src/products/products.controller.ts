import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products') 
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiOperation({
    summary: 'Crear producto',
    description: 'Crear un nuevo producto'
  })
  @ApiBody({type: CreateProductDto})
  @ApiResponse({status: 201, description: 'The user has been successfully created.'})
  @ApiResponse({status: 400, description: 'Bad Request.'})
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Mostrar todo',
    description: 'Muestra todos los productos en la base de datos'
  })
  findAll() {
    return this.productsService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({
    summary: 'Muestra un producto por el id',
    description: 'muestra un producto cuando se le pasa por parametros el id'
  })
  //@ApiBody({type: id})
  @ApiParam({name: 'id', required: true, description: 'ID User'})
  @ApiQuery({name: 'offset', required: false, type: Number, description: 'Numero de registros a omitir', example: 0})
  @ApiQuery({name: 'limit', required: false, type: Number, description: 'Numero maximo que va a retornar.', example: 10})
  @ApiQuery({name: 'search', required: false, type: String, description: 'No dejar espacios en blanco.', example: ''}) 
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }
  @ApiOperation({
    summary: 'Modificar un producto por el id',
    description: 'Modificar un producto cuando se le pasa por parametros el id'
  })
  @ApiParam({name: 'id', required: true, description: 'ID User'})
  @ApiQuery({name: 'offset', required: false, type: Number, description: 'Numero de registros a omitir', example: 0})
  @ApiQuery({name: 'limit', required: false, type: Number, description: 'Numero maximo que va a retornar.', example: 10})
  @ApiQuery({name: 'search', required: false, type: String, description: 'No dejar espacios en blanco.', example: ''})
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }
  @ApiOperation({
    summary: 'Elimina segun el id ',
    description: 'Elimina logicamente un producto pero se queda en la bd la fecha que se elimino'
  })
  @ApiParam({name: 'id', required: true, description: 'ID User'})
  // @ApiQuery({name: 'offset', required: false, type: Number, description: 'Numero de registros a omitir', example: 0})
  // @ApiQuery({name: 'limit', required: false, type: Number, description: 'Numero maximo que va a retornar.', example: 10})
  // @ApiQuery({name: 'search', required: false, type: String, description: 'No dejar espacios en blanco.', example: ''})
  @ApiResponse({ status: 204, description: 'Post deleted successfully.' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
