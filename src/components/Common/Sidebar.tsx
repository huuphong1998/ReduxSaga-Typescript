import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import { Dashboard, PeopleAlt } from '@material-ui/icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },

    link: {
        color: 'inherit',
        textDecoration: 'none',

        '&.active > div': {
            backgroundColor: theme.palette.action.selected,
        },
    },
}))

export interface SidebarProps {
    checked?: boolean
}

export function Sidebar({ checked }: SidebarProps) {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <NavLink to="/admin/dashboard" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.dashboard')} style={{ color: checked ? '#fff' : '' }} />
                    </ListItem>
                </NavLink>

                <NavLink to="/admin/students" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleAlt />
                        </ListItemIcon>
                        <ListItemText primary={t('sidebar.student')} style={{ color: checked ? '#fff' : '' }} />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    )
}
