import { User } from 'models'
import React, { ReactNode, useContext, useState } from 'react'

interface AuthProviderProps {
    children: ReactNode
}

interface ContextDefaultProps {
    login?: User
    handleLogin: (formValues: User) => void
}

const Context = React.createContext({} as ContextDefaultProps)

export default function AuthProvider({ children }: AuthProviderProps) {
    const [login, setLogin] = useState<User>()

    function handleLogin(formValues: User) {
        setLogin(formValues)
    }

    return <Context.Provider value={{ login, handleLogin }}>{children}</Context.Provider>
}

export function useAuth() {
    return useContext(Context)
}
