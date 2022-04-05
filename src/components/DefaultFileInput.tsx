import React, {
    ChangeEvent,
    useRef,
    useEffect,
    useCallback,
    useState,
} from 'react';

import { useField } from '@unform/core';
import { Avatar } from '@chakra-ui/react';

interface Props {
    name: string;
    userName?:string;
    initialUrl?:string
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export default function DefaultFileInput({ initialUrl, name, userName='User',...rest }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [preview, setPreview] = useState(defaultValue);

    const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setPreview(null);
        }

        const previewURL = URL.createObjectURL(file);

        setPreview(previewURL);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'files[0]',
            clearValue(ref: HTMLInputElement) {
                ref.value = '';
                setPreview(null);
            },
            setValue(_: HTMLInputElement, value: string) {
                setPreview(value);
            },
        });
    }, [fieldName, registerField]);

    return (
        <>
            <Avatar onError={()=> {}} size='2xl' name={userName} src={preview ? preview : initialUrl || ''} />
            <input type="file" style={{marginTop:'1rem'}} ref={inputRef} onChange={handlePreview} {...rest} />
        </>
    );
};