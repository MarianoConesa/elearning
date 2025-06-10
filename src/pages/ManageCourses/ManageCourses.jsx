import { Grid, Card, Tooltip, useTheme, useMediaQuery } from "@mui/material"
import CourseCardsMenu from "../../components/CourseCardsMenu"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import URL from '../../helpers/api_urls'
import { useEffect, useState } from "react"
import ManageCourseTabs from "../../components/ManageCourseTabs"

const { GET_OWNED_COURSES, GET_FOLLOWED_COURSES, GET_COMPLETED_COURSES } = URL

const ManageCourses = ({ fetchCourses, ...props }) => {
    const theme = useTheme()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [tab, setTab] = useState('followed')
    const [courses, setCourses] = useState([])
    const [coursesLoader, setCoursesLoader] = useState()

    const urlMap = {
        owned: GET_OWNED_COURSES,
        followed: GET_FOLLOWED_COURSES,
        completed: GET_COMPLETED_COURSES,
    }
    
    const updateTabs = () => {
        fetchCourses(setCourses, 1 , 30, urlMap[tab])
    }

    useEffect(() => {
        setCourses([])
        updateTabs()
    }, [tab])



    return (
        <>
        <ManageCourseTabs {...props} onChange={(newTab) => setTab(newTab)} />
        <CourseCardsMenu
        courses={courses}
        setCourses={setCourses}
        url={urlMap[tab]}
        tab={tab}
        loading={coursesLoader}
        fetchCourses={fetchCourses}
        {...props}
    />
    </>
    )
}

export default ManageCourses
