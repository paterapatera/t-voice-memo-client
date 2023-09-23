import { TextField } from "@mui/material"
import { UseFormRegisterReturn } from 'react-hook-form';

export function TimeField(props: { register: UseFormRegisterReturn }) {
    return <TextField
        variant="standard"
        {...props.register}
    />
}
