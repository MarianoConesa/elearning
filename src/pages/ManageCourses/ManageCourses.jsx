import { Grid, Card, Tooltip, useTheme, useMediaQuery } from "@mui/material"
import CourseCardsMenu from "../../components/CourseCardsMenu"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import URL from '../../helpers/api_urls'
import { useEffect, useState } from "react"
import ManageCourseTabs from "../../components/ManageCourseTabs"

const { GET_OWNED_COURSES, GET_FOLLOWED_COURSES, GET_COMPLETED_COURSES } = URL

const ManageCourses = (props) => {
    const theme = useTheme()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [tab, setTab] = useState('followed')
    const [courses, setCourses] = useState([])
    const [coursesLoader, setCoursesLoader] = useState()

    const updateCourses = (type = tab) => {
        const urlMap = {
            owned: GET_OWNED_COURSES,
            followed: GET_FOLLOWED_COURSES,
            completed: GET_COMPLETED_COURSES,
        }

        dfltApiCall('GET', urlMap[type], null, setCourses, setCoursesLoader)
    }

    useEffect(() => {
        updateCourses(tab)
    }, [tab])


    return (
        <>
        <ManageCourseTabs {...props} onChange={(newTab) => setTab(newTab)} />
        <CourseCardsMenu
        ownCourses={courses}
        tab={tab}
        loading={coursesLoader}
        onUpdate={updateCourses}
        {...props}
    />
    </>
    )
}

export default ManageCourses
