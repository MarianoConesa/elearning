import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'

const url = import.meta.env.VITE_APP_API

const dfltApiCall = async (method, addUrl, body, setState, setLoader) => {
  setLoader && setLoader(true);
  try {
    const isFormData = body instanceof FormData; // Detecta si el body es FormData

    const config = {
      method: method,
      url: `${url}${addUrl ?? ''}`,
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
        'Accept': 'application/json',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }) // No establecer Content-Type si es FormData
      },
      withCredentials: true, 
      data: body, // Puede ser JSON o FormData
    };

    const response = await axios(config);

    if (response.data?.token) {
      Cookies.set('token', response.data.token, { expires: 7, sameSite: 'Lax', secure: false });
    }

    const data = (response.data?.pagination || response.message?.pagination) ? response.data : (response.data.message ?? response.data.data);
    setState && setState(data);
    setLoader && setLoader(false);
    return data;
  } catch (error) {
    console.error(`failed api call: ${error}`);
    setLoader && setLoader(false);
  }
};


export { dfltApiCall }
