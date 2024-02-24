import { IsEmpty, IsNumber, IsString } from "class-validator";
import { Userx } from "../../auth/schemas/user.schema";

export class CreateTransactionDto {
    @IsEmpty()
    @IsNumber()
    amount: number

    @IsEmpty()
    @IsString()
    transType: string

    @IsEmpty()
    @IsString()
    description: string

    @IsEmpty()
    @IsString()
    pin: string

    @IsEmpty({message: "You have to be logged in to use this route"})
    readonly user: Userx
}

