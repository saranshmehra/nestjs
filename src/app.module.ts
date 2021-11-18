import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb://localhost/nest'), UsersModule]
})

export class AppModule {}
