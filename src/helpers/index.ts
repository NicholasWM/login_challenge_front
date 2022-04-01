import * as Yup from "yup"
import { RequiredStringSchema } from "yup/lib/string"
import { AnyObject } from "yup/lib/types"

export type ValidationSchema = RequiredStringSchema<string, AnyObject>

interface IDeleteValidationError <T extends string> {
    names: T[],
    formRef:React.MutableRefObject<any>
}

type IUpdateErrors<T extends string> = {
    [name in T]: any
}

export function deleteValidationError<T extends string>({names, formRef}:IDeleteValidationError<T>) {
    let updatedErrors = {} as IUpdateErrors<T>
    const currentErrors = formRef.current.getErrors()
    Object.keys(currentErrors).forEach((e:T) => {
        if (!names.includes(e)) {
            updatedErrors[e] = currentErrors[e]
        }
    })
    formRef.current.setErrors(updatedErrors);
}

export const phoneRegExp = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/
export const removeSpecialCharacters = (str: string) => str.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '')

export const setValidationErrors = (error, formRef:React.MutableRefObject<any>) => {
    const validationErrors = {};
    if (error instanceof Yup.ValidationError) {
        error.inner.forEach(error => {
            validationErrors[error.path] = error.message;
        });
        const currentErrors = formRef.current.getErrors()
        formRef.current.setErrors({ ...validationErrors, ...currentErrors });
    }
}