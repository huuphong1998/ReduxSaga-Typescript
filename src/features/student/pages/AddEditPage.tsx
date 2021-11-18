import { Box, Typography } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import studentApi from 'api/studentApi'
import { Student } from 'models'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import StudentForm from '../components/StudentForm'

export interface AddEditPageProps {
    checked?: boolean
}

export default function AddEditPage({ checked }: AddEditPageProps) {
    const history = useHistory()
    const { t } = useTranslation()

    const { studentId } = useParams<{ studentId: string }>()
    const isEdit = Boolean(studentId)
    const [student, setStudent] = useState<Student>()

    useEffect(() => {
        if (!studentId) return
        ;(async () => {
            try {
                const data: Student = await studentApi.getById(studentId)
                setStudent(data)
            } catch (error) {
                console.log('Failed to fetch student details', error)
            }
        })()
    }, [studentId])

    const handleStudentFormSubmit = async (formValues: Student) => {
        if (isEdit) {
            await studentApi.update(formValues)
        } else {
            await studentApi.add(formValues)
        }
        // Toast success
        toast.success('Save student successfully!')

        // Redirect back to student list
        history.push('/admin/students')
    }

    const initialValues: Student = {
        name: '',
        age: '',
        mark: '',
        gender: 'male',
        city: '',
        ...student,
    } as Student

    return (
        <Box>
            <Link to="/admin/students">
                <Typography
                    variant="caption"
                    style={{ display: 'flex', alignItems: 'center', color: checked ? '#fff' : '' }}
                >
                    <ChevronLeft /> &nbsp;{t('student.back')}
                </Typography>
            </Link>

            <Typography variant="h4" style={{ color: checked ? '#fff' : '' }}>
                {isEdit ? `${t('student.updateStudent')}` : `${t('student.addNewStudent')}`}
            </Typography>

            {(!isEdit || Boolean(student)) && (
                <Box mt={3}>
                    <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
                </Box>
            )}
        </Box>
    )
}
