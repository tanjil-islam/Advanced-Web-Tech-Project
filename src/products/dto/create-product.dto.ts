import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message:'title can not be blank.'})
    @IsString()
    title:string;

    @IsNotEmpty({message:'description can not be blank.'})
    @IsString()
    description:string;

    @IsNotEmpty({message:'price can not be blank.'})
    @IsNumber({maxDecimalPlaces:2},{message:'price should be number & max decimal precission 2'})
    @IsPositive({message:'price should be positive number'})
    price:number;

    @IsNotEmpty({message:'stock can not be empty.'})
    @IsNumber({},{message:'stock should be number'})
    @Min(0,{message:'stock can not be negative'})
    stock:number;

    @IsNotEmpty({ message: 'Images cannot be empty.' })
    @IsArray({ message: 'Images should be in an array format.' })
    @ArrayMinSize(1, { message: 'At least one image is required.' })
    @IsString({ each: true, message: 'Each image must be a string.' })
    images: string[];

    @IsNotEmpty({message:'category can not be empty.'})
    @IsNumber({},{message:'category id should be a number.'})
    categoryId:number;
}
