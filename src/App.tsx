import { createTheme, ThemeProvider } from '@material-ui/core'
import { NotFound, PrivateRoute } from 'components/Common'
import { AdminLayout } from 'components/Layout'
import LoginPage from 'features/auth/pages/LoginPage'
import RegisterPage from 'features/auth/pages/RegisterPage'
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
    const [darkMode, setDarkMode] = useState(false)

    const theme = createTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <Switch>
                <Route path="/" exact>
                    <LoginPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <PrivateRoute path="/admin">
                    <AdminLayout checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </PrivateRoute>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </ThemeProvider>
    )
}

export default App
