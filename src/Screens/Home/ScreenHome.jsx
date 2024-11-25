import { useEffect, useState } from 'react'
import { dfltApiCall } from '../../hooks/api/useApiCall'
import Home from '../../pages/Home/Home'
import URL from '../../helpers/api_urls'

const {GET_INITIAL_IMAGES, GET_USER_INFO, GET_CATEGORIES} = URL

const ScreenHome = () =>{
    const [data, setData] = useState()
    const [userData, setUserData] = useState()
    const [loader, setLoader] = useState()
    const [userLoader, setUserLoader] = useState()
    const [categories, setCategories] = useState()
    const [catLoader, setCatLoader] = useState()
    
    const update = () =>{
        setUserData(null)
        dfltApiCall('GET', GET_INITIAL_IMAGES ,null,setData,setLoader)
        dfltApiCall('GET', GET_USER_INFO ,null,setUserData,setUserLoader)
    }

    const updateCat = () =>{
        dfltApiCall('GET', GET_CATEGORIES ,null,setCategories,setCatLoader)
    }

    useEffect(()=>{
        update()
        updateCat()
    }, [])

    return <Home {...{data, userData, loader, userLoader, update, categories, catLoader}}/>
}

export default ScreenHome