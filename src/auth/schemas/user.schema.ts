import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Role {
    SuperAdmin = 'superAdmin',
    Admin = 'admin',
    User = 'user'
}

export enum Status {
    Verified = 'verified',
    Pending = 'pending'
}


@Schema({
    timestamps: true
})

export class Userx {
    @Prop({required: true})
    name: string;

    @Prop({required: true, default: "pending"})
    status: Status;

    @Prop({required: true})
    account: number;
    
    @Prop({unique: true, required: true})
    email: string;
    
    @Prop({required: true})
    mobile: string;
    
    @Prop({required: true})
    password: string;
    
    @Prop({required: true, default: "user"})
    roles: Role;
    
    @Prop({required: true})
    pin: string;

    @Prop()
    country: string;

    @Prop()
    age: number;
        
    @Prop()
    resetPasswordToken: string;

    @Prop()
    resetPasswordExpires: Date;

    @Prop({default: 0})
    balance: number

    // @Prop()
    // passwordResetExpires: Date
 
    
}


export const UserSchema = SchemaFactory.createForClass(Userx)