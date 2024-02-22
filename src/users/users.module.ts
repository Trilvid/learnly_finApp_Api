import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './mailer.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
    MailerModule.forRoot(mailerConfig)
  ],
  exports: [MailerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
