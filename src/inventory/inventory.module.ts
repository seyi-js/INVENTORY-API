import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InventorySchema } from './model';
import { UserSchema } from 'src/user/model';
@Module({
  imports:[MongooseModule.forFeature([{name:'Inventory',schema:InventorySchema}]),MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
