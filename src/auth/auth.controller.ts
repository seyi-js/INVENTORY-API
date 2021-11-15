import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from '../user/dto/create-user.dto'
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
 async UserRegistration(@Body() createUser: CreateUserDto) {
   await this.authService.register(createUser);

   return 'User registration successful.';
  };


  @Post('/login')
  async UserLogin(@Body() loginUser:LoginDto){
    return await this.authService.login(loginUser);
  }


}
