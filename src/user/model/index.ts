import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
      type:String,
      required:true,
      },
  password:{
      type:String,
      required:true
  },
  isAdmin:{
      type:Boolean,
      default:false
  },
  cart:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Inventory'
      }

  ] //Link to inventory collection
},{timestamps:true});