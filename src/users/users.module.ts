import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from  "../auth/schemas/user.schema"
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './mailer.config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Userx', schema: UserSchema}]),
    MailerModule.forRoot(mailerConfig)
  ],
  exports: [MailerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
