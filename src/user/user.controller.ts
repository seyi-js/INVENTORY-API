import { Controller, Get, Post, Body, Patch, Param, Delete,Req,Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {Request,Response} from 'express';
import { User } from './interfaces/user.interface';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  /**
   * 
   * @access Private
   * @returns user - the user object
   */
  @Get()
  async UserInfo(@Req() req:Request) {
    return this.userService.findUser(req)
  }

  

  
}
