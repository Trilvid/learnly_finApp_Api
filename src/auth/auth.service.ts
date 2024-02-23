import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { createHash, randomBytes  } from 'crypto';
import * as crypto from 'crypto'


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        private mailService: MailerService
    ) {}

    async signUp(signUpDto: SignUpDto, reciever: string, subject: string, content: string): Promise<{ token: string }> {
        const { name, email, password, pin, mobile, age, country } = signUpDto

        const hashedpassword = await bcrypt.hash(password, 10)

        function generateNumbers() {
            const numbers = [];
            for (let i = 0; i < 9; i++) {
              let randomNumber = Math.floor(Math.random() * 8);
              if (i === 0 && randomNumber === 0) {
                randomNumber = 7;
              }
              numbers.push(randomNumber);
            }
            return numbers.join('');
          }

          const acctNo = generateNumbers()

        const existingEmail = await this.userModel.findOne({email});

        if(existingEmail) {
            throw new UnauthorizedException('Sorry this email already exists')
        } else {
            try{
                const sent = await this.mailService.sendMail({
                  to: reciever,
                  subject,
                  html: content
                });
          
                if(sent) {
                  console.log("Email sent successfully")
                }
          
              } catch (error) {
                console.error('Error sending email', error);
              }
        try {

        const user = await this.userModel.create({
            name,
            email,
            password: hashedpassword,
            pin,
            account: 7+acctNo,
            mobile,
            country,
            age
        })
        
        
        const token = this.jwtService.sign({id: user._id})

        return { token }
        } 
        catch (error) {
          if (error instanceof mongoose.Error.ValidationError) {
            console.error('Validation error:', error.message);
          } 
          else {
            console.error('Error occurred:', error);
          }
        }
    }
    }
    
    
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto

    const user = await this.userModel.findOne({email})

    if(!user) {
        throw new UnauthorizedException('Invalid email or password')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password')
    }
    
    const token = this.jwtService.sign({id: user._id})

    return { token }
}


    async ForgotPassword(forgotPasswordDto: ForgotPasswordDto, to: string, subject: string, content: string): Promise<User> {
      const { email } = forgotPasswordDto
      const mail = await this.userModel.findOne({email})
      if(!mail){
        throw new UnauthorizedException('this email does not exist please sign up')
      }
      else {
        
        try{
          const sent = await this.mailService.sendMail({
            to,
            subject,
            html: content
          });
    
          if(sent) {
            console.log("Email sent successfully")
            return 
          }
    
        } catch (error) {
          console.error('Error sending email', error);
        }
        return 

      }
    }
      
    async createResetToken(email: string): Promise<string> {
      const user = await this.userModel.findOne({email});
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const resetToken = randomBytes(64).toString('hex');
      const hash = createHash('sha256').update(resetToken).digest('hex');
      // const expirationDate = new Date(Date.now() + 3600000);
      const expirationDate =  Date.now() + 15 * 60 * 1000;

      user.resetPasswordToken = hash;
      user.resetPasswordExpires = expirationDate;
      // const time = Date.now() + 60 * 60 * 1000;
      // console.log({resetToken, hash, expires: user.resetPasswordExpires, time})

      await user.save();

      return hash;  
    }

    
  hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<User> {
    const { password, confirmPassword } = resetPasswordDto;
    const hashedToken = this.hashToken(token);
    const user = await this.userModel.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires:  {$gt: Date.now() },
      },
    });

    if (!user) {
      throw new UnauthorizedException("Token is invalid or has expired");
    }

    if(password != confirmPassword) {
      throw new UnauthorizedException('password does not match') 
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return ;
  } 
}