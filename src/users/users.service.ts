import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo:Repository<User>,
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>
  ){}

  async create(createUserDto: CreateUserDto): Promise<{ user: User; profile: Profile }> {
    
    const user = this.userRepo.create(createUserDto);
    await this.userRepo.save(user);

    
    const profile = this.profileRepo.create({
      nombre: createUserDto.name,
      email: createUserDto.email,
    });
    await this.profileRepo.save(profile);

    return { user, profile }; 
  }
  findOneByEmail(email:string){
  return this.userRepo.findOneBy({email})
  }
  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id,updateUserDto );
  }

  async remove(id: number) {
    return await this.userRepo.softDelete({id});
  }
}
