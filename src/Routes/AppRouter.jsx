import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ScreenHome from "../Screens/Home/ScreenHome"
import ScreenManageCourses from "../Screens/ManageCourses/ScreenManageCourses"
import ScreenCourse from "../Screens/Course/ScreenCourse"
import ScreenProfile from "../Screens/Profile/ScreenProfile"
import { useEffect, useState } from 'react'
import { dfltApiCall } from '../hooks/api/useApiCall'
import URL from '../helpers/api_urls'
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Box, Grid } from "@mui/material"

const { GET_INITIAL_IMAGES, GET_USER_INFO, GET_CATEGORIES, GET_ALL_COURSES } = URL

const AppRouter = () => {
    const [initData, setInitData] = useState()
    const [userData, setUserData] = useState()
    const [catData, setCatData] = useState()
    const [courseData, setCourseData] = useState()
    const [loader, setLoader] = useState()
    const [userLoader, setUserLoader] = useState()
    const [catLoader, setCatLoader] = useState()
    const [coursesLoader, setCoursesLoader] = useState()
    const [filterCat, setFilterCat] = useState([])

    const update = () => {
        updateUserData()
        updateCourses()
        dfltApiCall('GET', GET_INITIAL_IMAGES, null, setInitData, setLoader)
        dfltApiCall('GET', GET_CATEGORIES, null, setCatData, setCatLoader)
    }

    const updateUserData = () => {
        setUserData(null)
        dfltApiCall('GET', GET_USER_INFO, null, setUserData, setUserLoader)
    }

    const updateCourses = () => {
        dfltApiCall('GET', GET_ALL_COURSES, null, setCourseData, setCoursesLoader)
    }

    useEffect(() => {
        update()
    }, [])

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
                <Header {...{ initData, userData, catData, courseData, loader, userLoader, catLoader, coursesLoader, update }} />
                
                <Grid item container sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <Routes>
                        <Route path={import.meta.env.VITE_APP_HOME} element={<ScreenHome {...{ initData, userData, catData, courseData, filterCat, setFilterCat, loader, userLoader, catLoader, coursesLoader, update }} />} />
                        <Route path={import.meta.env.VITE_APP_MANAGECOURSES} element={<ScreenManageCourses {...{ initData, userData, catData, courseData, filterCat, setFilterCat, loader, userLoader, catLoader, coursesLoader, update }} />} />
                        <Route path={`${import.meta.env.VITE_APP_COURSE}:id`} element={<ScreenCourse {...{ initData, userData, catData, courseData, loader, userLoader, catLoader, coursesLoader, update, updateUserData, updateCourses }} />} />
                        <Route path={import.meta.env.VITE_APP_USER_PROFILE} element={<ScreenProfile {...{ initData, userData, loader, userLoader, update, updateUserData }} />} />
                    </Routes>
                </Grid>

                <Footer />
            </Box>
        </BrowserRouter>
    )
}

export default AppRouter
