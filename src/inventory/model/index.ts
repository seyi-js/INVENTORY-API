import * as mongoose from 'mongoose';

export const InventorySchema = new mongoose.Schema({
  name: {
      type:String,
      required:true,
      },
  price:{
      type:Number,
      default:0
  },
  quantity:{
      type:Number,
      default:1
  }
},{timestamps:true});