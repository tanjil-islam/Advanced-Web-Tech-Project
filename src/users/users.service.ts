import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-signin.dto';
import { hash,compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository:Repository<UserEntity>,
  ){}

  async signup(userSignUpDto:UserSignUpDto):Promise<UserEntity> {

    const userExists=await this.findUserByEmail(userSignUpDto.email)
    if(userExists) throw new BadRequestException('Email is not available.')

      const user=this.usersRepository.create(userSignUpDto);
      return await this.usersRepository.save(user);
    
  }

  async signin(userSignInDto:UserSignInDto) {
    const userExists=await this.usersRepository.createQueryBuilder('users').addSelect
    ('users.password').where('users.email=:email',{email:userSignInDto.email}).getOne();
    if(!userExists) throw new BadRequestException('Bad Credential');
    const matchPassword=await compare(userSignInDto.password,userExists.password);
    if(!matchPassword) throw new BadRequestException('Bad Credential.');
    delete userExists.password;
    return userExists;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  } 

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

 async  findOne(id: number):Promise<UserEntity> {
    const user= await this.usersRepository.findOneBy({id});
    if(!user) throw new NotFoundException('user not found')
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email:string) {
    return await this.usersRepository.findOneBy({email});
  }

  async accessToken(user:UserEntity) {
    return sign({id:user.id,email:user.email},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
  }
}
