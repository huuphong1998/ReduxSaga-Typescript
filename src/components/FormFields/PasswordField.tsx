import { TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import React, { InputHTMLAttributes, useState } from 'react'
import { Control, useController } from 'react-hook-form'

export interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    control: Control<any>
    label?: string
}

export function PasswordField({ name, control, label, ...inputProps }: PasswordFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })

    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword((x) => !x)
    }

    return (
        <TextField
            fullWidth
            size="small"
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            variant="outlined"
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}
