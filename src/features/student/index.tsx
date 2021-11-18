import { useAppDispatch } from 'app/hooks'
import { cityActions } from 'features/city/citySlice'
import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import AddEditPage from './pages/AddEditPage'
import ListPage from './pages/ListPage'

export interface StudentFeatureProps {
    checked?: boolean
}

export default function StudentFeature({ checked }: StudentFeatureProps) {
    const match = useRouteMatch()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(cityActions.fetchCityList())
    }, [dispatch])

    return (
        <Switch>
            <Route path={match.path} exact>
                <ListPage checked={checked} />
            </Route>

            <Route path={`${match.path}/add`}>
                <AddEditPage checked={checked} />
            </Route>

            <Route path={`${match.path}/:studentId`}>
                <AddEditPage />
            </Route>
        </Switch>
    )
}
