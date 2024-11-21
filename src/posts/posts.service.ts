import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor( 
    @InjectRepository(Post)
    private readonly postRepo:Repository<Post>
  ){}
  create(createPostDto: CreatePostDto) {
    const post = this.postRepo.create(createPostDto)
    return this.postRepo.save(post);
  }

  findAll() {
    return this.postRepo.find();
  }

  findOne(id: number) {
    return this.postRepo.findOneBy({id});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return  this.postRepo.update(id, updatePostDto);
  }

  remove(id: number) {
    return  this.postRepo.softDelete(id);
  }
}
