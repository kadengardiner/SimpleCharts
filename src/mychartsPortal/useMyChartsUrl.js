import { useState } from 'react'
import hospitals from './hospitalData'

const STORAGE_KEY = 'mychartsHospitalId'

export default function useMyChartsUrl() {
    const [hospitalId, setHospitalId] = useState(
        () => localStorage.getItem(STORAGE_KEY) || ''
    )

    const selectedHospital = hospitals.find(h => h.id === hospitalId) || null

    function saveHospital(id) {
        localStorage.setItem(STORAGE_KEY, id)
        setHospitalId(id)
    }

    function clearHospital() {
        localStorage.removeItem(STORAGE_KEY)
        setHospitalId('')
    }

    return { selectedHospital, saveHospital, clearHospital }
}