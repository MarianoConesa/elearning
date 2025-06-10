import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ForeignProfile from "../../pages/Profile/ForeignProfile"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import URL from "../../helpers/api_urls"

const { GET_FOREIGN_USER_INFO, GET_USER_COURSES } = URL

const ScreenForeignProfile = ({ catData, filterCat, setFilterCat, fetchCourses }) => {
  const { id: userId } = useParams()

  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const getUserAndCourses = async () => {
    setLoading(true)
    try {
      const userData = await dfltApiCall("GET", `${GET_FOREIGN_USER_INFO}/${userId}`)
      fetchCourses(setCourses, 1 , 30, `${GET_USER_COURSES}/${userId}`)
      setUser(userData)
    } catch (err) {
      console.error("Error cargando datos del perfil externo", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) getUserAndCourses()
  }, [userId])

  return (
    <ForeignProfile {...{user, courses, setCourses, catData, filterCat, setFilterCat, fetchCourses}}
      onUpdate={getUserAndCourses}
      url={`${GET_USER_COURSES}/${userId}`}
    />
  )
}

export default ScreenForeignProfile
