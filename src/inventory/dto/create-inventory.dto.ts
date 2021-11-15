import {IsString,IsNotEmpty,IsNumber} from 'class-validator'


export class CreateInventoryDto {

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    price:number;


    @IsNumber()
    @IsNotEmpty()
    quantity:number;

}
