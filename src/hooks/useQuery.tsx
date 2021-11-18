import qs from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export default function useQuery() {
    const location = useLocation()
    const queryString = useMemo(() => qs.parse(location.search), [location.search])

    return queryString
}
