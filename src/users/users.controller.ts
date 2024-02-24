import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Userx } from  "../auth/schemas/user.schema";
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/allusers')
  @UseGuards(AuthGuard())
  async getAllUsers():Promise<Userx[]> {
    return this.usersService.findAll();
  }
  
  @Get('/')
  @UseGuards(AuthGuard())
  getUser(
    @Req() req: any
  ) {
    return this.usersService.findById(req.user._id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: Userx) {
    return this.usersService.updateById(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeById(id);
  }
}
