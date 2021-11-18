import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import { ChatBubble, PeopleAlt } from '@material-ui/icons'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import StatisticItem from './components/StatisticItem'
import StudentRankingList from './components/StudentRankingList'
import Widget from './components/Widget'
import {
    dashboardActions,
    selectDashboardLoading,
    selectDashboardStatistics,
    selectHighestStudentList,
    selectLowestStudentList,
    selectRankingByCityList,
} from './dashboardSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    loading: {
        position: 'absolute',
        padding: theme.spacing(-1),
        width: '100%',
    },
}))

export interface DashboardProps {
    checked?: boolean
}

export default function Dashboard({ checked }: DashboardProps) {
    const dispatch = useAppDispatch()
    const loading = useAppSelector(selectDashboardLoading)
    const statistics = useAppSelector(selectDashboardStatistics)
    const highestStudentList = useAppSelector(selectHighestStudentList)
    const lowestStudentList = useAppSelector(selectLowestStudentList)
    const rankingByCityList = useAppSelector(selectRankingByCityList)

    const classes = useStyles()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(dashboardActions.fetchData())
    }, [dispatch])

    return (
        <Box className={classes.root}>
            {/* loading */}
            {loading && <LinearProgress className={classes.loading} />}

            {/* Statistic Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label={t('dashboard.male')}
                        value={statistics.maleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label={t('dashboard.female')}
                        value={statistics.femaleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<ChatBubble fontSize="large" color="primary" />}
                        label={`${t('dashboard.mark')} >= 8`}
                        value={statistics.highMarkCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<ChatBubble fontSize="large" color="primary" />}
                        label={`${t('dashboard.mark')} <= 5`}
                        value={statistics.lowMarkCount}
                    />
                </Grid>
            </Grid>

            {/* All students ranking */}
            <Box mt={5}>
                <Typography variant="h4" style={{ color: checked ? '#fff' : '' }}>
                    {t('dashboard.allStudent')}
                </Typography>

                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title={t('dashboard.highestMark')}>
                                <StudentRankingList studentList={highestStudentList} />
                            </Widget>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title={t('dashboard.lowestMark')}>
                                <StudentRankingList studentList={lowestStudentList} />
                            </Widget>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* Rankings By City */}
            <Box mt={5}>
                <Typography variant="h4" style={{ color: checked ? '#fff' : '' }}>
                    {t('dashboard.rankingByCity')}
                </Typography>

                <Box mt={2}>
                    <Grid container spacing={3}>
                        {rankingByCityList.map((ranking) => (
                            <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                                <Widget title={`TP. ${ranking.cityName}`}>
                                    <StudentRankingList studentList={ranking.rankingList} />
                                </Widget>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
