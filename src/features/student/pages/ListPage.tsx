import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import studentApi from 'api/studentApi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectCityList, selectCityMap } from 'features/city/citySlice'
import { ListParams, Student } from 'models'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { toast } from 'react-toastify'
import StudentFilter from '../components/StudentFilter'
import StudentTable from '../components/StudentTable'
import {
    selectStudentFilter,
    selectStudentList,
    selectStudentLoading,
    selectStudentPagination,
    studentActions,
} from '../studentSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },

    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: theme.spacing(4),
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%',
    },
}))

export interface ListPageProps {
    checked?: boolean
}

export default function ListPage({ checked }: ListPageProps) {
    const match = useRouteMatch()
    const history = useHistory()
    const location = useLocation()
    const queryParams = queryString.parse(location.search)
    const dispatch = useAppDispatch()
    const classes = useStyles()
    const { t } = useTranslation()

    const studentList = useAppSelector(selectStudentList)
    const pagination = useAppSelector(selectStudentPagination)
    const filter = useAppSelector(selectStudentFilter)
    const loading = useAppSelector(selectStudentLoading)
    const cityMap = useAppSelector(selectCityMap)
    const cityList = useAppSelector(selectCityList)
    const [filters, setFilters] = useState(() => ({
        ...queryParams,
        _page: Number.parseInt(queryParams._page as string) || 1,
        _limit: Number.parseInt(queryParams._limit as string) || 15,
    }))

    useEffect(() => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        })
    }, [history, filters])

    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filters))
    }, [dispatch, filters])

    const handlePageChange = (e: any, page: number) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page,
        }))
    }

    const handleSearchChange = (newFilter: ListParams) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilter,
        }))
    }

    const handleFilterChange = (newFilter: ListParams) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilter,
        }))
        dispatch(studentActions.setFilter(newFilter))
    }

    const handleRemoveStudent = async (student: Student) => {
        try {
            // Remove student API
            await studentApi.remove(student?.id || '')

            toast.success('Remove student successfully!')

            // Trigger to re-fetch student list with current filter
            const newFilter = { ...filters }
            dispatch(studentActions.setFilter(newFilter))
        } catch (error) {
            console.log('Failed to fetch student', error)
        }
    }

    const handleEditStudent = async (student: Student) => {
        history.push(`${match.url}/${student.id}`)
    }

    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading} />}

            <Box className={classes.titleContainer}>
                <Typography variant="h4" style={{ color: checked ? '#fff' : '' }}>
                    {t('student.students')}
                </Typography>
                <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        {t('student.addNewStudent')}
                    </Button>
                </Link>
            </Box>

            <Box mb={3}>
                <StudentFilter
                    checked={checked}
                    filter={filter}
                    cityList={cityList}
                    onChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                />
            </Box>

            {/* StudentTable */}
            <StudentTable
                checked={checked}
                studentList={studentList}
                cityMap={cityMap}
                onEdit={handleEditStudent}
                onRemove={handleRemoveStudent}
            />

            {/* Pagination */}
            <Box my={2} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(pagination?._totalRows / pagination?._limit)}
                    page={pagination?._page}
                    onChange={handlePageChange}
                />
            </Box>
        </Box>
    )
}
