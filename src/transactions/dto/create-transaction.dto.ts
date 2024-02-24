import { IsEmpty } from "class-validator";
import { Userx } from "../../auth/schemas/user.schema";

export class CreateTransactionDto {
    @IsEmpty({message: "You have to be logged in to use this route"})
    readonly user: Userx
}

