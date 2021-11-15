import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/model';
import {AuthModule} from '../auth/auth.module'
@Module({
  imports:[AuthModule,MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
