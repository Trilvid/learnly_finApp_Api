import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { Roles } from './roles.decorator';
import { Role } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService
    ) {}

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto, signUpDto.email)
    }
    
    @Post('/login')
    loginUser(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto)
    }

    @Post('/forgotpassword')
    async forgotPassword(@Body() forgotPasswordDto:ForgotPasswordDto, @Req() req: any): Promise<{email: string}> {
        const subject = "Reset Password";
        const resetToken = await this.authService.createResetToken(forgotPasswordDto.email);
        const resetURL = `${req.protocol}://${req.get(
            'host'
        )}/auth/resetpassword/${resetToken}`;
        
        const content = `Please use the link to change your account password. \n  ${resetURL} \n Thank you for using Learnly. if you did not apply for this request, please do disregard this email.`;
        return this.authService.ForgotPassword(forgotPasswordDto, forgotPasswordDto.email, subject, content)
    }

    @Patch('/resetpassword/:token')
    async resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(token, resetPasswordDto)
    }

    @Get('/:id/verify/:token')
    // @Roles(Role.Admin)
    async verifyEmail(@Param('id') id: string) {
        return this.authService.verifyEmail(id)
    }
}
