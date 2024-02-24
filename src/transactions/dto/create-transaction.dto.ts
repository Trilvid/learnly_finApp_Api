import {  IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Userx } from "../../auth/schemas/user.schema";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    pin: string
}

