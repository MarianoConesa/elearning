import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import Course from "../../pages/CourseView/Course"
import URL from "../../helpers/api_urls"

const { GET_COURSE } = URL

const ScreenCourse = (props) => {
    const { id } = useParams() // Obtener el ID del curso desde la URL
    const [course, setCourse] = useState(null)
    const [courseLoader, setCourseLoader] = useState(true)

    const updateCourse = () => {
        setCourseLoader(true)
        dfltApiCall("POST", GET_COURSE, { id }, setCourse, setCourseLoader)
    }

    useEffect(() => {
        updateCourse()
    }, [id])

    return <Course {...props} {...{ id, course, courseLoader, updateCourse }} />
}

export default ScreenCourse
