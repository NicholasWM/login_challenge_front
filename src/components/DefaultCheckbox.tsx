import { Checkbox } from "@chakra-ui/react";
import { useField } from "@unform/core";
import { useRef, useEffect } from "react";

interface IDefaultCheckbox {
    id: string,
    name: string,
    label: string,
    value?: number,
}

export function DefaultCheckbox({ id, name, value=0, label, ...rest }: IDefaultCheckbox) {
    const checkboxRef = useRef(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)
    const defaultChecked = defaultValue === value

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: checkboxRef,
            getValue: ref => {
                return ref.current.checked
            },
            clearValue: ref => {
                ref.current.checked = defaultChecked
            },
            setValue: (ref, value) => {
                ref.current.checked = value
            },
        })
    }, [defaultValue, fieldName, registerField, defaultChecked])
    return (
        <Checkbox
            defaultChecked={undefined}
            onBlur={undefined}
            checked={undefined}
            isRequired={false}
            size={'md'}
            id={id}
            name={name}
            value={value}
            colorScheme='blue'
            ref={checkboxRef}
            {...rest}        >
            {label}
        </Checkbox>
    )
}