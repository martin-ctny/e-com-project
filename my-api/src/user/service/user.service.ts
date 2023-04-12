import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../dto/user-create';
import { UserUpdateDto } from '../dto/user-update';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders');
    return await query.getMany();
  }

  async createUser(data: UserCreateDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const userToCreate = {
        ...data,
        password: hashedPassword,
      };
      return this.userRepository.save(userToCreate);

      // return this.userRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }
  async findOneBy(id: string) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .where('user.id = :id', { id });
    return await query.getOne();
  }
  async findOneByEmail(email: string) {
    console.log('email', email);

    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .where('user.email = :email', { email });
    return await query.getOne();
  }

  async updateUser(id: string, data?: UserUpdateDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    Object.assign(user, data);
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
    return user;
  }
}
