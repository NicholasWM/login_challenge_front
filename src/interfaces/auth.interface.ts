import { User } from "./user.interface";

export interface SignInProps {
    email: string,
    password: string,
}

export interface SignInResponse extends User{
    token: string,
}

export interface GetMeResponse extends User{
    createdAt: string,
    updatedAt: string,
}