import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService
    ) {}

  @Post('/deposit')
  @UseGuards(AuthGuard())
  createDeposit(
    @Body() createTransactionDto: CreateTransactionDto, 
    @Req() req: any) {
    return this.transactionsService.deposit(createTransactionDto, req.user._id);
  }

  @Post('/withdrawal')
  @UseGuards(AuthGuard())
  createWithdrawal(
    @Body() createTransactionDto: CreateTransactionDto, 
    @Req() req: any) {
    return this.transactionsService.withdraw(createTransactionDto, req.user._id);
  }

 
  @Post('/transfer')
  @UseGuards(AuthGuard())
  createTransfer(
    @Body() body: any,
    @Req() req: any) {
      const {reciever, amount, description, pin } = body
    return this.transactionsService.transfer(reciever, amount, description, req.user._id, pin);
  }


  @Get('/histroy')
  @UseGuards(AuthGuard())
  findAll(@Req() req:any, userId: string) {
    return this.transactionsService.allTransactions(req.user._id);
  }

}
