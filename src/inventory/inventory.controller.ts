import { Controller, Get, Post, Body, Put,Param, Delete, Req } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import {Request} from 'express'

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  /**
   * @access Admin
   * @description For creating new inventories.
   * @param createInventoryDto 
   * @returns 
   */
  @Post('/new')
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  /**
   * @access private
   * @description  Get all inventories
   * @returns 
   */
  @Get('/all')
  findAll() {
    return this.inventoryService.findAll();
  }

  
/**
 * @access Admin
 * @description For updating inventories
 * @param id 
 * @param updateInventoryDto 
 * @returns 
 */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  /**
   * @access Admin
   * @description For deleting inventories
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }

  /**
   * @access Private
   * @description add inventory to cart
   * @param id 
   * @param req 
   * @returns 
   */
  @Post(':id/add')
  addInventoryToCart(@Param('id') id:string, @Req() req:Request){

    return this.inventoryService.addToCart(id,req)

  };


  /** @description Get an inventory
   * @access private
   * @param id 
   * @returns 
   */

  @Get(':id/view')
  findInventory(@Param('id') id:string,){
    return this.inventoryService.find(id)
  }
}
