import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../service/user.service';

import { User } from '../entity/user.entity';
import { UserCreateDto } from '../dto/user-create';
import { UserUpdateDto } from '../dto/user-update';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOneBy(id);
  }

  @Post()
  createUser(@Body() data: UserCreateDto): Promise<User> {
    return this.userService.createUser(data);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() data: UserUpdateDto,
  ): Promise<User> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }

  // @Post(':id/roles')
  // async addRoleToUser(@Param('id') id: string, @Body() role: Role) {
  //   return this.userService.addRoleToUser(id, role);
  // }
}
