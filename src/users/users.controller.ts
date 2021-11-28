import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user';
import { UsersService } from './users.service';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) { }

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.usersService.createUser(createUserDto);
	}

	@Get()
	async findAllUsers(): Promise<User[]> {
		return await this.usersService.findAllUsers();
	}

	@Get('/:id')
	async findUserById(@Param('id') id: Types.ObjectId): Promise<User> {
		return await this.usersService.findUserById(id);
	}

	@Put('/:id')
	async updateUser(@Param('id') id: Types.ObjectId, @Body() updateUserDto: UpdateUserDto): Promise<User> {
		return await this.usersService.updateUser(id, updateUserDto);
	}

	@Delete('/:id')
	deleteUser(@Param('id') id: Types.ObjectId): Promise<any> {
		return this.usersService.deleteUser(id);
	}

}
