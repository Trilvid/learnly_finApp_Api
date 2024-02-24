import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/transaction.schema';
import { AuthModule } from './../auth/auth.module';
import { UserSchema } from './../users/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'Transaction', schema: TransactionSchema}]),
    MongooseModule.forFeature([{name: 'Userx', schema: UserSchema}])
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
