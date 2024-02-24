import { Injectable, NotFoundException } from '@nestjs/common';
import { Userx } from  "../auth/schemas/user.schema"
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Userx.name)
    private userModel: mongoose.Model<Userx>,
    private readonly mailService: MailerService
  ) {}

  async createUser(user: Userx,reciever: string, subject: string, content: string): Promise<Userx> {
    
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

  async findAll(): Promise<Userx[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findById(userId: string): Promise<Userx> {
    const res = await this.userModel.findById(userId);

    if(!res) {
      throw new NotFoundException('This User does not exists.')
    }

    return res;
  }

  async updateById(id: string, user: Userx): Promise<Userx> {
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
