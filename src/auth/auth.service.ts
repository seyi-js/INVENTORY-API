/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, BadRequestException,ForbiddenException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>,private jwtService:JwtService) { }


  async register(user: User): Promise<User> {

    const isUser = await this.UserModel.findOne({email:user.email});

    if(isUser){
      throw new BadRequestException('User exists.')
    }

    const saltOrRounds = 10;
    const password = user.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    user.password = hash;
    const newUser = new this.UserModel(user);


    return await newUser.save();
  }

  async login(login_details: User): Promise<Object> {
    const user = await this.UserModel.findOne({ email: login_details.email });

    if (!user) {
      throw new BadRequestException('Invalid login credentials supplied.')
    };

    const isMatch = await bcrypt.compare(login_details.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid login credentials supplied.')
    };

    return {
      JWT: this.generateToken({_id:user._id,isAdmin:user.isAdmin})
    }
  };

  generateToken(payload:object){

    return this.jwtService.sign(payload)

  };

  verifyToken(token){
    try {
      const decoded = this.jwtService.verify(token);

      return decoded;
    } catch (error) {
      throw new ForbiddenException(error)
    }
  };

  


}
