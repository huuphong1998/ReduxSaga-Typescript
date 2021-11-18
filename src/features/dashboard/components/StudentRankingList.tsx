import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Student } from 'models'
import React from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
    table: {},
})

export interface StudentRankingListProps {
    studentList: Student[]
}

export default function StudentRankingList({ studentList }: StudentRankingListProps) {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="left">{t('dashboard.name')}</TableCell>
                        <TableCell align="right">{t('dashboard.mark')}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {studentList.map((student, idx) => (
                        <TableRow key={student.id}>
                            <TableCell align="center">{idx + 1}</TableCell>
                            <TableCell align="left">{student.name}</TableCell>
                            <TableCell align="right">{student.mark}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
