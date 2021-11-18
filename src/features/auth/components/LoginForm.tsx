import { yupResolver } from '@hookform/resolvers/yup'
import { Button, makeStyles } from '@material-ui/core'
import { InputField } from 'components/FormFields'
import { PasswordField } from 'components/FormFields'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { LoginPayload } from '../authSlice'

export interface LoginFormProps {
    initialValues?: LoginPayload
    onSubmit?: (formValues: LoginPayload) => void
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(4),
    },

    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },

    title: {
        margin: theme.spacing(2, 0, 3, 0),
        textAlign: 'center',
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0,
    },
}))

export default function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
    const classes = useStyles()
    // const [error, setError] = useState<string>('')

    const schema = yup.object().shape({
        email: yup.string().required('Please enter your email.').email('Please enter a valid email address.'),
        password: yup.string().required('Please enter your password'),
    })

    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting },
    } = useForm<LoginPayload>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    })

    const handleFormSubmit = async (formValues: LoginPayload) => {
        try {
            await onSubmit?.(formValues)
        } catch (error: any) {
            if (error.status === 422) {
                for (const key in error.data) {
                    setError(key as 'password' | 'email', {
                        type: 'server',
                        message: error.data[key],
                    })
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <InputField name="email" label="Email" control={control} />
            <PasswordField name="password" label="Password" control={control} />
            <Button
                disabled={isSubmitting}
                type="submit"
                className={classes.submit}
                variant="contained"
                color="primary"
                fullWidth
                size="large"
            >
                Login
            </Button>
        </form>
    )
}
