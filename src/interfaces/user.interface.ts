export interface User {
    id:number,
    name:string,
    email:string,
    phoneNumber:string,
    hasPermission:boolean,
    imageExternalUrl:string,
    imageName:string,
}

export interface UpdateUserResponse {
    message:string,
    status: number
}

export interface UpdateUserProps {
    id:number,
    name?:string,
    email?:string,
    phoneNumber?:string,
    hasPermission?:boolean,
    password?:string,
    passwordConfirmation?:string,
    file?:File,
}

export interface DeleteUserProps {
    id: number
}

export interface DeleteUserResponse {
    message: string,
    status: number
}