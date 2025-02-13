import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'

const url = import.meta.env.VITE_APP_API

const dfltApiCall = async (method, addUrl, body, setState, setLoader) => {
  setLoader && setLoader(true)
  try {
    const config = {
      method: method,
      url: `${url}${addUrl ?? ''}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
      withCredentials: true, 
    }

    if(method === 'POST'){
      config.data = body
    }
    const response = await axios(config)
    response.data?.token && Cookies.set('token', response.data.token, { expires: 7, sameSite: 'Lax', secure: false }); //sameSite: none no funciona sin secure true (https)
    const data = response.data.message
    setState && setState(data)
    setLoader && setLoader(false)
    return data
  } catch (error) {
    console.error(`failed api call: ${error}`)
    setLoader && setLoader(false)
  }
}

export { dfltApiCall }
