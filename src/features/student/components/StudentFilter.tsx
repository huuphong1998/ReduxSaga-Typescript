import { Box, Button, Grid, MenuItem, Select } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { Search } from '@material-ui/icons'
import { City, ListParams } from 'models'
import React, { ChangeEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface StudentFilterProps {
    filter: ListParams
    cityList: City[]

    checked?: boolean
    onChange?: (newFilter: ListParams) => void
    onSearchChange?: (newFilter: ListParams) => void
}

export default function StudentFilter({ filter, cityList, checked, onChange, onSearchChange }: StudentFilterProps) {
    const searchRef = useRef<HTMLInputElement>()
    const { t } = useTranslation()

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return

        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        }

        onSearchChange(newFilter)
    }

    const handleCityChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
        if (!onChange) return

        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined,
        }

        onChange(newFilter)
    }

    const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
        if (!onChange) return

        const value = e.target.value
        const [_sort, _order] = (value as string).split('.')
        const newFilter: ListParams = {
            ...filter,
            _sort: _sort || undefined,
            _order: (_order as 'asc' | 'desc') || undefined,
        }

        onChange(newFilter)
    }

    const handleClearFilter = () => {
        if (!onChange) return

        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            _sort: undefined,
            _order: undefined,
            city: undefined,
            name_like: undefined,
        }

        onChange(newFilter)

        if (searchRef.current) {
            searchRef.current.value = ''
        }
    }

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName">{t('student.search')}</InputLabel>
                        <OutlinedInput
                            id="searchByName"
                            label={t('student.search')}
                            defaultValue={filter.name_like}
                            endAdornment={<Search />}
                            onChange={handleSearchChange}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="filterByCity">{t('student.filter')}</InputLabel>
                        <Select
                            labelId="filterByCity"
                            value={filter.city || ''}
                            onChange={handleCityChange}
                            label={t('student.filter')}
                        >
                            <MenuItem value="">
                                <em>{t('student.all')}</em>
                            </MenuItem>

                            {cityList.map((city) => (
                                <MenuItem key={city.code} value={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="sortBy">{t('student.sort')}</InputLabel>
                        <Select
                            labelId="sortBy"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            onChange={handleSortChange}
                            label={t('student.sort')}
                        >
                            <MenuItem value="">
                                <em>{t('student.noSort')}</em>
                            </MenuItem>

                            <MenuItem value="name.asc">{t('student.nameAsc')}</MenuItem>
                            <MenuItem value="name.desc">{t('student.nameDesc')}</MenuItem>
                            <MenuItem value="mark.asc">{t('student.markAsc')}</MenuItem>
                            <MenuItem value="mark.desc">{t('student.markDesc')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={1}>
                    <Button
                        variant="outlined"
                        color={checked ? 'secondary' : 'primary'}
                        fullWidth
                        onClick={handleClearFilter}
                    >
                        {t('student.clear')}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
