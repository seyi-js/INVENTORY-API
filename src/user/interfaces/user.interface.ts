import {Inventory} from '../../inventory/interfaces/inventory.interface'
export interface User {
    _id?: string;
    email: string;
    password: string;
    isAdmin?:boolean;
    cart?:Array<any>
  }