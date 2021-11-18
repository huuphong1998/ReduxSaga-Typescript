import { Box, Button, CircularProgress } from '@material-ui/core'
import { useAppSelector } from 'app/hooks'
import { InputField, RadioGroupField } from 'components/FormFields'
import { SelectField } from 'components/FormFields/SelectField'
import { selectCityOptions } from 'features/city/citySlice'
import { Student } from 'models'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Alert } from '@material-ui/lab'
import { useTranslation } from 'react-i18next'

export interface StudentFormProps {
    initialValues?: Student
    onSubmit?: (formValues: Student) => void
}

const schema = yup.object({
    name: yup
        .string()
        .required('Please enter name.')
        .test('two-words', 'Please enter at least two words', (value) => {
            if (!value) return true

            const parts = value?.split(' ') || []
            return parts.filter((x) => !!x).length >= 2
        }),
    age: yup
        .number()
        .positive('Please enter a positive.')
        .min(18, 'Min is 18')
        .max(60, 'Max is 60')
        .integer('Please enter an integer.')
        .required('Please enter an age.')
        .typeError('Please enter a valid number.'),
    mark: yup
        .number()
        .min(0, 'Min is 0')
        .max(10, 'Max is 10')
        .required('Please enter mark.')
        .typeError('Please enter a valid number.'),
    gender: yup
        .string()
        .oneOf(['male', 'female'], 'Please select either male or female')
        .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
})

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOptions)
    const [error, setError] = useState<string>('')
    const { t } = useTranslation()

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    })

    const handleFormSubmit = async (formValues: Student) => {
        try {
            // Clear previous submission error
            setError('')

            await onSubmit?.(formValues)
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="name" control={control} label={t('student.fullName')} />

                <RadioGroupField
                    name="gender"
                    control={control}
                    label={t('student.gender')}
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                />

                <InputField name="age" control={control} label={t('student.age')} type="number" />
                <InputField name="mark" control={control} label={t('dashboard.mark')} type="number" />

                {Array.isArray(cityOptions) && cityOptions.length > 0 && (
                    <SelectField name="city" control={control} label={t('student.city')} options={cityOptions} />
                )}

                {error && <Alert severity="error">{error}</Alert>}

                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} />} &nbsp;{t('student.save')}
                    </Button>
                </Box>
            </form>
        </Box>
    )
}
