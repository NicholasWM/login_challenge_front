import { User } from "./user.interface";

export interface SignInProps {
    email: string,
    password: string,
}

export interface SignInResponse extends User{
    token: string,
}

export interface SignUpProps {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    phoneNumber: string,
    hasPermission: boolean,
    file?: File
}

export interface SignUpResponse{
    user: SignInResponse,
    message: string
}

export interface GetMeResponse extends User{
    createdAt: string,
    updatedAt: string,
}