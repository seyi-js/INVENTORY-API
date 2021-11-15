import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<User>, private authService: AuthService) { }


  async findUser(req) {

    const user = await (await this.UserModel.findById(req.user._id))
    .populate('cart')


    user.password = undefined
    user.cart?.map(inv =>  inv.quantity = undefined)

    return user;
  }
}
