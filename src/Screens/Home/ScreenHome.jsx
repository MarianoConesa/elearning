import { useEffect, useState } from 'react'
import { dfltApiCall } from '../../hooks/api/useApiCall'
import Home from '../../pages/Home/Home'
import URL from '../../helpers/api_urls'

const {GET_INITIAL_IMAGES, GET_USER_INFO, GET_CATEGORIES} = URL

const ScreenHome = (props) =>{

    return <Home {...props}/>
}

export default ScreenHome