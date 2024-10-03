import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo:Repository<Product>
  ){}
  async create(createProductDto: CreateProductDto):Promise<Product> {
    const product = await this.productRepo.create(createProductDto)
    return await this.productRepo.save(product);
  }

  findAll() {
    return  this.productRepo.find();
  }

  findOne(id: number) {
    return  this.productRepo.findOneBy({id});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return  this.productRepo.update(id, updateProductDto);
  }

  remove(id: number) {
    return  this.productRepo.softDelete(id);
  }
}
