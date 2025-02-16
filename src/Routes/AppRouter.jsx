import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ScreenHome from "../Screens/Home/ScreenHome"
import ScreenManageCourses from "../Screens/ManageCourses/ScreenManageCourses"
import { useEffect, useState } from 'react'
import { dfltApiCall } from '../hooks/api/useApiCall'
import URL from '../helpers/api_urls'

const {GET_INITIAL_IMAGES, GET_USER_INFO} = URL

const AppRouter = () =>{
    const [data, setData] = useState()
    const [userData, setUserData] = useState()
    const [loader, setLoader] = useState()
    const [userLoader, setUserLoader] = useState()

    const update = () =>{
        setUserData(null)
        dfltApiCall('GET', GET_INITIAL_IMAGES ,null,setData,setLoader)
        dfltApiCall('GET', GET_USER_INFO ,null,setUserData,setUserLoader)
    }

    useEffect(()=>{
        update()
    }, [])

    return <BrowserRouter>
        <Routes>
            <Route path={import.meta.env.VITE_APP_HOME} element={<ScreenHome {...{data, userData, loader, userLoader, update}}/>}></Route>
            <Route path={import.meta.env.VITE_APP_MANAGECOURSES} element={<ScreenManageCourses {...{data, userData, loader, userLoader, update}}/>}></Route>
        </Routes>
    </BrowserRouter>

}

export default AppRouter