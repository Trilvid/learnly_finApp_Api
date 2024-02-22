import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        private mailService: MailerService
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password, age, country, mobile, role, account } = signUpDto

        const hashedpassword = await bcrypt.hash(password, 10)

        const existingEmail = await this.userModel.findOne({email});

        if(existingEmail) {
            throw new UnauthorizedException('Sorry this email already exists')
        } else {

        const user = await this.userModel.create({
            name,
            email,
            password: hashedpassword,
            age,
            country,
            account,
            mobile,
            role
        })
        
        const token = this.jwtService.sign({id: user._id})

        return { token }
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
}
