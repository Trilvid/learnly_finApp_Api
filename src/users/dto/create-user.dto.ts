import { Role } from "../schemas/user.schema";

export class CreateUserDto {
    readonly name: string;
    readonly age: string;
    readonly account: number;
    readonly role: Role;
    readonly country: string;
    readonly mobile: string;
    readonly email: string;
}