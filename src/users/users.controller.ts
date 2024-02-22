import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: User) {
    return this.usersService.createUser(user, user.email, "testing this email", "the Email and Rmail is working just fine");
  }

  @Get()
  async getAllUsers():Promise<User[]> {
    return this.usersService.findAll();
  }
  
  @Get('/mail')
  async sendEmail() {
    const emailSent = await this.usersService.sendMail('martinsnwangele@gmail.com', 'Hello I am Testing this Email', 'contentect to the internet');

    if(emailSent) {
      return { message: 'email was sent successfully' }
    }
    else {
     return { message: 'email was not sent '}
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: User) {
    return this.usersService.updateById(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeById(id);
  }
}
