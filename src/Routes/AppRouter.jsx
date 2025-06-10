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
import ScreenForeignProfile from "../Screens/Profile/ScreenForeignProfile"
import EmailVerified from "../pages/EmailVerified"

const { GET_INITIAL_IMAGES, GET_USER_INFO, GET_CATEGORIES, GET_ALL_COURSES, SEARCH_COURSES } = URL

const AppRouter = () => {
    const [initData, setInitData] = useState()
    const [userData, setUserData] = useState()
    const [catData, setCatData] = useState()
    const [courseData, setCourseData] = useState([])
    const [loader, setLoader] = useState()
    const [userLoader, setUserLoader] = useState()
    const [catLoader, setCatLoader] = useState()
    const [coursesLoader, setCoursesLoader] = useState()
    const [filterCat, setFilterCat] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

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
        fetchCourses(setCourseData, 1 , 50 , GET_ALL_COURSES)
    }

    useEffect(() => {
        update()
    }, [])

    const handleSearch = (term) => {
        setSearchTerm(term)
        fetchSearchCourses(setCourseData, term, 1, 30)
    }

    const fetchCourses = async (setter, page = 1, per_page = 30, endpoint = GET_ALL_COURSES) => {
        const url = `${endpoint}?page=${page}&per_page=${per_page}`
        const res = await dfltApiCall("GET", url, { page, per_page })
      
        if (res) {
          const newCourses = res.data.courses
          setter(prev => {
            const existingIds = new Set(prev.map(c => c.id))
            const filteredNew = newCourses.filter(c => !existingIds.has(c.id))
            return [...prev, ...filteredNew]
          })
          
          const currentPage = res.pagination.current_page
          const lastPage = res.pagination.last_page
      
          return {
            hasPage: res.pagination.has_more_pages,
            nextPage: res.pagination.has_more_pages ? currentPage + 1 : currentPage
          }
        } else {
          setter([])
          return { hasPage: false, nextPage: page }
        }
      }

      const fetchSearchCourses = async (setter, searchTerm, page = 1, per_page = 30, endpoint = SEARCH_COURSES) => {
        try {
          const body = JSON.stringify([
            searchTerm,
            {
              page,
              per_page
            }
          ])
      
          const res = await dfltApiCall('POST', endpoint, body)
      
          if (res?.data) {
            const newCourses = res.data.courses || res.data // fallback por si cambia el backend
            setter(prev => {
                const existingIds = new Set(prev.map(c => c.id))
                const filteredNew = newCourses.filter(c => !existingIds.has(c.id))
                return [...prev, ...filteredNew]
              })
              

      
            const currentPage = res.pagination?.current_page ?? page
            const lastPage = res.pagination?.last_page ?? page
      
            return {
              hasPage: currentPage < lastPage,
              nextPage: currentPage < lastPage ? currentPage + 1 : currentPage
            }
          } else {
            setter([])
            return { hasPage: false, nextPage: page }
          }
        } catch (error) {
          console.error('Error en fetchSearchCourses:', error)
          setter([])
          return { hasPage: false, nextPage: page }
        }
      }
      

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
                <Header {...{ initData, userData, catData, courseData, loader, userLoader, catLoader, coursesLoader, update, handleSearch }} />
                
                <Grid id="scrollableDiv" item container sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <Routes>
                        <Route path={import.meta.env.VITE_APP_HOME} element={<ScreenHome {...{ initData, userData, catData, courseData,setCourseData, filterCat, setFilterCat, loader, userLoader, catLoader, coursesLoader, update, fetchCourses, searchTerm, fetchSearchCourses }} />} />
                        <Route path={import.meta.env.VITE_APP_MANAGECOURSES} element={<ScreenManageCourses {...{ initData, userData, catData, courseData, filterCat, setFilterCat, loader, userLoader, catLoader, coursesLoader, update, fetchCourses , updateUserData}} />} />
                        <Route path={`${import.meta.env.VITE_APP_COURSE}:id`} element={<ScreenCourse {...{ initData, userData, catData, courseData, loader, userLoader, catLoader, coursesLoader, update, updateUserData, updateCourses }} />} />
                        <Route path={import.meta.env.VITE_APP_USER_PROFILE} element={<ScreenProfile {...{ initData, userData, loader, userLoader, update, updateUserData }} />} />
                        <Route path={`${import.meta.env.VITE_APP_FOREIGN_PROFILE}:id`} element={<ScreenForeignProfile {...{ initData, userData, loader, userLoader, update, updateUserData, catData ,filterCat, setFilterCat, fetchCourses }} />} />
                        <Route path={import.meta.env.VITE_APP_EMAIL_VERIFIED} element={<EmailVerified/>} />
                    </Routes>
                </Grid>

                <Footer {...{initData}} />
            </Box>
        </BrowserRouter>
    )
}

export default AppRouter
