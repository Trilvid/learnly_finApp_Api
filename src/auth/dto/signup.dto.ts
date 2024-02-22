import { IsNotEmpty, IsString, IsEnum, IsEmail, IsNumber, MinLength } from "class-validator";
import { Role } from "../schemas/user.schema";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email'})
    email: string; 

    @IsNotEmpty()
    @IsString()
    mobile: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsNumber()
    account: number;

    @IsNotEmpty()
    @IsEnum(Role, {message: 'Please provide correct role'})
    role: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}

function IsUnique(): (target: SignUpDto, propertyKey: "email") => void {
    throw new Error("Function not implemented.");
}

