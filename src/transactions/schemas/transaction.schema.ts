import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Userx } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";

export enum TransactionType  {
    Deposit = 'deposit',
    Withdrawal = 'withdrawal',
    Transfer = 'transfer'
}

@Schema({
    timestamps: true
})

export class Transaction {
    @Prop({required: true})
    transType: TransactionType ;
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Userx', required: true})
    user: Userx;

    @Prop({required: true})
    description: string;
    
}


export const TransactionSchema = SchemaFactory.createForClass(Transaction)