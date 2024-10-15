import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ScreenHome from "../Screens/Home/ScreenHome"

const AppRouter = () =>{

    return <BrowserRouter>
        <Routes>
            <Route path={import.meta.env.VITE_APP_HOME} element={<ScreenHome/>}></Route>
        </Routes>
    </BrowserRouter>

}

export default AppRouter