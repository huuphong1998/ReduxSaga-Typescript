import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import userApi from 'api/userApi'
import { useAppDispatch } from 'app/hooks'
import { useAuth } from 'hooks/useAuth'
import { ListResponseUser } from 'models'
import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { authActions, LoginPayload } from '../authSlice'
import RegisterForm from '../components/RegisterForm'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },

    box: {
        padding: theme.spacing(3),
    },
}))

export default function RegisterPage() {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const auth = useAuth()
    const history = useHistory()

    const initialValues: LoginPayload = {
        email: '',
        password: '',
        confirmedPassword: '',
    }

    // Redux Saga
    // const handleUserFormSubmit = async (formValues: LoginPayload) => {
    //     await dispatch(
    //         authActions.login({
    //             email: formValues.email,
    //             password: formValues.password,
    //         })
    //     )
    // }

    // Context
    const handleUserFormSubmit = async (formValues: LoginPayload) => {
        // call API
        const response: ListResponseUser = await userApi.register(formValues)

        // set login from data API
        auth.handleLogin(response.data.user)

        // set token from data API
        localStorage.setItem('access_token', response.data.access_token)

        // redirect to admin page
        history.push('/admin/dashboard')
    }

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component="h1">
                    Sign Up
                </Typography>

                <Box>
                    <RegisterForm initialValues={initialValues} onSubmit={handleUserFormSubmit} />
                </Box>

                <Typography variant="h6" component="h6">
                    Have an account?&nbsp;
                    <Link to="/login">Sign In</Link>
                </Typography>
            </Paper>
        </div>
    )
}
