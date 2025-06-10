import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
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

Home.propTypes = {
    data: PropTypes.array,
    userData: PropTypes.object,
    loader: PropTypes.bool,
    userLoader: PropTypes.bool
}

export default Home
