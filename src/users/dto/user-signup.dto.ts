import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";

export class UserSignUpDto extends UserSignInDto{

    @IsNotEmpty({message:'Name can not be null.'})
    @IsString({message:'Name should be string.'})
    name:string;

    @IsOptional()
    @IsIn(['admin', 'user'], { message: 'Role must be either admin or user.' })
    roles?: string;
   
}