import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private readonly mailService: MailerService
  ) {}

   async sendMail(reciever: string, subject: string, content: string) {

    try{
      await this.mailService.sendMail({
        to: reciever,
        subject,
        html: content
      });

      return true;
    } catch (error) {
      console.error('Error sending email', error);
      return false; 
    }
  } 

  async createUser(user: User,reciever: string, subject: string, content: string): Promise<User> {
    
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
    const res = await this.userModel.create(user);
    return res;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findById(id: string): Promise<User> {
    const res = await this.userModel.findById(id);

    if(!res) {
      throw new NotFoundException('This User does not exists.')
    }

    return res;
  }

  async updateById(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true
    });
  }

  async removeById(id: string) {
    // return `This action removes a #${id} user`;
    return await this.userModel.findByIdAndDelete(id)
  }
}
