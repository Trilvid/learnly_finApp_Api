import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionType } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { Userx } from 'src/auth/schemas/user.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Userx.name) private readonly userModel: Model<Userx>,
    @InjectModel(Transaction.name)
    private transactModel: Model<Transaction>
  ) {}

  async deposit(createTransactionDto: CreateTransactionDto, userId: string): Promise<Transaction> {
    const {amount, description, pin } = createTransactionDto;

    const user = await this.userModel.findById(userId)
    if(!user) throw new UnauthorizedException('User not Found')

    if(user.pin === pin) {
      throw new UnauthorizedException("Sorry invalid pin")
    }

    const depo = await this.transactModel.create({
      user: user._id,
      amount,
      description,
      transType: TransactionType.Deposit
    }) 

    if (depo) {
      user.balance += amount;
      await user.save();
  
    }
    return depo;
  }

  async withdraw(createTransactionDto: CreateTransactionDto, userId: string): Promise<Transaction> {
    const {amount, description, pin } = createTransactionDto;

    const user = await this.userModel.findById(userId)
    if(!user) throw new UnauthorizedException('User not Found')

    if(user.pin === pin) {
      throw new UnauthorizedException('Sorry invalid pin')
    }
    
    else if (user.balance < amount) throw new BadRequestException('Insufficient balance');

    const withdraw = await this.transactModel.create({
      user: user._id,
      amount,
      description,
      transType: TransactionType.Withdrawal
    }) 

    if (withdraw) {
      user.balance -= amount;
      await user.save();
  
    }
    return withdraw;
  }


  async transfer(
    reciever: number,
     amount: number, 
     description: string, 
     userId: string,
     pin: string
     ): Promise<Transaction[]> {

    const user = await this.userModel.findById(userId)
    if(!user) throw new UnauthorizedException('User not Found')

    const toreciever = await this.userModel.findOne({reciever})
    if(!toreciever) throw new UnauthorizedException('invalid account number')

    if(user.pin === pin) {
      throw new UnauthorizedException('Sorry invalid pin')
    }

    else if (user.balance < amount) throw new BadRequestException('Insufficient balance');

    const withdrawal = await this.transactModel.create({
      user: user._id,
      amount,
      description,
      transType: TransactionType.Withdrawal
    }) 

    const deposit = await this.transactModel.create({
      user: toreciever._id,
      amount,
      description,
      transType: TransactionType.Deposit
    }) 

      user.balance -= amount;
      toreciever.balance += amount;
      await user.save();
      await toreciever.save();


    return [withdrawal, deposit];
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
