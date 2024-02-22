import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Role {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    User = 'User'
}

@Schema({
    timestamps: true
})

export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    age: number;

    @Prop({required: true})
    account: number;
    
    @Prop({unique: "sorry this email already exists"})
    email: string;
    
    @Prop({required: true})
    mobile: string;
    
    @Prop({required: true})
    password: string;
    
    @Prop({required: true, default: "User"})
    role: Role;
    
    @Prop({required: true})
    country: string;
    
}


export const UserSchema = SchemaFactory.createForClass(User)