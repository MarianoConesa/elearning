import { Grid } from '@mui/material'
import CourseCardsMenu from '../../components/CourseCardsMenu'

const Home = ({ courseData, setCourseData, ...props }) => {

    return (
        <Grid container>
            <Grid item xs={12} sx={{minHeight: `81dvh`}}>
                <CourseCardsMenu {...props} courses={courseData} setCourses={setCourseData}/>
                    
            </Grid>
        </Grid>
    )
}

export default Home
