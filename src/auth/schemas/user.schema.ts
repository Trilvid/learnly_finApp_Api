import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Role {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    User = 'User'
}

export enum Status {
    Verified = 'verified',
    Pending = 'pending'
}


@Schema({
    timestamps: true
})

export class User {
    static findOne(arg0: { where: { passwordResetToken: void; passwordResetExpires: boolean; }; }) {
      throw new Error('Method not implemented.');
    }
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
    
    @Prop({required: true, default: "User"})
    role: Role;
    
    @Prop({required: true})
    pin: string;

    @Prop()
    country: string;

    @Prop()
    age: number;
        
    @Prop()
    resetPasswordToken: string;

    @Prop()
    resetPasswordExpires: number;

    @Prop()
    passwordResetToken: string

    @Prop()
    passwordResetExpires: Date

    
}


export const UserSchema = SchemaFactory.createForClass(User)