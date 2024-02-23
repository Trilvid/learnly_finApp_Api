import { IsNotEmpty, IsEmail } from "class-validator";
export class ForgotPasswordDto {
    
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email'})
    readonly email: string;
}

