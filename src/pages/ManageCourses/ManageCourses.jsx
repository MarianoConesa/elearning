import { Grid, Card, Tooltip, useTheme, useMediaQuery } from "@mui/material"
import CourseCardsMenu from "../../components/CourseCardsMenu"

const ManageCourses = (props) => {
    const theme = useTheme()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <CourseCardsMenu {...props}/>
    )
}

export default ManageCourses
