import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from './interfaces/inventory.interface';
import { User } from 'src/user/interfaces/user.interface';
@Injectable()
export class InventoryService {
  constructor(@InjectModel('Inventory') private InventoryModel: Model<Inventory>, @InjectModel('User') private UserModel: Model<User>) { }

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const newInventory = new this.InventoryModel(createInventoryDto);


    return await newInventory.save()
  }

  async findAll() {
    return await this.InventoryModel.find({})
  }



  async update(id: string, inventory: Inventory) {
    return await this.InventoryModel.findByIdAndUpdate(id, inventory, { new: true });
  }

  async remove(id: string) {
    return await this.InventoryModel.findByIdAndDelete(id)
  }

  async addToCart(id: string, req) {

    const user = await this.UserModel.findById(req.user._id);
    if (user.cart.find(inv => inv.toString() === id)) {
      throw new BadRequestException('This item has already been added to your cart.')
    };

    user.cart.push(id)

    await user.save();

    return await this.InventoryModel.findByIdAndUpdate(id, { $inc: { quantity: -1 } })

  };

  async find(id:string){
    
    return await this.InventoryModel.findById(id);
  }
 
}
