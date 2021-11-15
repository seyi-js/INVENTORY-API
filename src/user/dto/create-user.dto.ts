import {IsEmail,IsPhoneNumber,IsString,IsNotEmpty} from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;


}
