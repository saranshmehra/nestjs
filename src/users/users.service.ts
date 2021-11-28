import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './models/user';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) { }

  async hashPassword(rawPassword: string): Promise<string> {
    return await hash(rawPassword, 10);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.model.create({
      ...createUserDto, password: await this.hashPassword(createUserDto.password)
    })
  }

  async findAllUsers(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findUserById(id: Types.ObjectId): Promise<User> {
    return await this.model.findOne({ _id: id }).exec();
  }

  async updateUser(id: Types.ObjectId, update = {}): Promise<User> {
    return await this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async deleteUser(id: Types.ObjectId): Promise<any> {
    return await this.model.findByIdAndDelete(id);
  }

}
