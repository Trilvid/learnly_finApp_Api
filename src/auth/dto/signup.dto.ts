import { IsNotEmpty, IsString, IsEnum, IsEmail, IsNumber, MinLength, MaxLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email'})
    email: string; 

    @IsNotEmpty()
    @IsString()
    @MaxLength(11)
    mobile: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(6)
    pin: number;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;


}
