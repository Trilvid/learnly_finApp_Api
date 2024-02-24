import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Userx } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { createHash, randomBytes  } from 'crypto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Userx.name)
        private userModel: Model<Userx>,
        private jwtService: JwtService,
        private mailService: MailerService
    ) {}

    async signUp(signUpDto: SignUpDto, reciever: string): Promise<{ token: string }> {
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
        const userId = user._id
        const token = this.jwtService.sign({id: user._id})
        
            try{
              const subject = "CONFIRM YOUR LEARNLY FIN APP";
              const url= `${process.env.BASE_URL}auth/${userId}/verify/${token}`
              const content = `Confirm your account \n Thank you for signing up for Learnly. To confirm your account, please follow the link below. \n ${url}`;
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
        

        return { token }
    }
    }
    
    
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto

    const user = await this.userModel.findOne({email})

    if(user.status === "pending") {
      throw new BadRequestException('Please veryify your email to continue')
    }

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


    async ForgotPassword(forgotPasswordDto: ForgotPasswordDto, to: string, subject: string, content: string): Promise<Userx> {
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
      const expirationDate = new Date(Date.now() + 3600000);

      user.resetPasswordToken = hash;
      user.resetPasswordExpires = expirationDate;
      console.log({hash,expirationDate})

      await user.save();

      return hash;  
    }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<Userx> {
    const { password, confirmPassword } = resetPasswordDto;
    const hashedToken = token;

    const user = await this.userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new UnauthorizedException("Token is invalid or has expired");
    }

    if(password != confirmPassword) {
      throw new BadRequestException('password does not match') 
    }
    
    const hashedpassword = await bcrypt.hash(password, 10)

    user.password = hashedpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return ;
  } 

async verifyEmail(_id: string): Promise<Userx> {
  const user = await this.userModel.findById({_id});

  if(!user) {
    throw new NotFoundException('This User does not exists.')
  }
  else {
    const token = this.jwtService.sign({id: user._id})

    if(!token) {
      throw new BadRequestException("please try again later")
    }

    await this.userModel.updateOne({_id: user.id},{
      $set: {status: 'verified'}
    })

  }
   
  return 
}







}
