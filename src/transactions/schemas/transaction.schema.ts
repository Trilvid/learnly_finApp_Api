import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Userx } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";

@Schema({
    timestamps: true
})

export class Transaction {
    @Prop()
    transType: string;

    @Prop()
    withdraw: number;
    
    @Prop()
    transfer: string;
    
    @Prop()
    balance: string;
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: Userx;
    
    @Prop()
    pin: string;

    @Prop()
    accountNo: string;
    
}


export const TransactionSchema = SchemaFactory.createForClass(Transaction)