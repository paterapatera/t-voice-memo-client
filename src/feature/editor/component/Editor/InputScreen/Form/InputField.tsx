import { TextField } from "@mui/material"
import { UseFormRegisterReturn } from 'react-hook-form';

export function InputField(props: { register: UseFormRegisterReturn }) {
    return <TextField
        label="Input"
        multiline
        variant="standard"
        {...props.register}
    />
}
