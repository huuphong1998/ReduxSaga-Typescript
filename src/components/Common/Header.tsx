import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useAppDispatch } from 'app/hooks'
import { authActions } from 'features/auth/authSlice'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl'
import { useTranslation } from 'react-i18next'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Switch } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    formControl: {
        marginLeft: theme.spacing(2),
    },
    selectEmpty: {
        color: '#fff',
    },
    selectOption: {
        color: '#000',
    },
    title: {
        flexGrow: 1,
    },
}))

export interface HeaderProps {
    checked?: boolean
    onChange?: () => void
}

export function Header({ checked, onChange }: HeaderProps) {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const history = useHistory()
    const [language, setLanguage] = useState('')
    const { t, i18n } = useTranslation()
    const changeLanguage = (lng: any) => i18n.changeLanguage(lng)

    // Redux Saga
    // const handleLogoutClick = () => {
    //     dispatch(authActions.logout())
    // }

    // Context
    const handleLogoutClick = () => {
        // remove token from localStorage
        localStorage.removeItem('access_token')

        // Redirect page login
        history.push('/login')
    }

    const handleChange = (event: any) => {
        setLanguage(event.target.value)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {t('header.studentManagement')}
                    </Typography>

                    <Switch checked={checked} onChange={onChange} />

                    <Button color="inherit" onClick={handleLogoutClick}>
                        {t('header.logout')}
                    </Button>
                    <FormControl className={classes.formControl}>
                        <Select
                            value={language}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>{t('header.language')}</em>
                            </MenuItem>
                            <MenuItem value={10} onClick={() => changeLanguage('vi')}>
                                Tiếng Việt
                            </MenuItem>
                            <MenuItem value={20} onClick={() => changeLanguage('en')}>
                                English
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Toolbar>
            </AppBar>
        </div>
    )
}
