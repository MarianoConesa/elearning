import {
    Avatar, Box, Button, CircularProgress, Grid,
    IconButton, Typography, useMediaQuery, useTheme
} from "@mui/material"
import { FavoriteBorder } from "@mui/icons-material"
import { useEffect, useState } from "react"
import CourseVideo from "../../components/CourseVideo"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import URL from "../../helpers/api_urls"
import VideoInfoBox from "../../components/VideoInfoBox/VideoInfoBox"

const { FOLLOW, UNFOLLOW, COMPLETE } = URL

const Course = ({ id, course, courseLoader, userData, update, updateUserData, updateCourses, userLoader }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [likes, setLikes] = useState(course?.likes || 0)

    const [followed, setFollowed] = useState(null)
    const [ended, setEnded] = useState(null)
    const owned = course?.user?.id === userData?.id

    const videos = course?.videos || []
    const [activeVideoIndex, setActiveVideoIndex] = useState(0)

    useEffect(() => {
        if (userData) {
            setFollowed(userData.followed.includes(Number(id)))
            setEnded(userData.ended.includes(Number(id)))
        }
        console.log({followed, ended, userData, id})
    }, [userData, id])

    const handleFollow = async () => {
        await dfltApiCall("POST", FOLLOW, { id })
        await updateUserData()
    }

    const handleUnfollow = async () => {
        await dfltApiCall("POST", UNFOLLOW, { id })
        await updateUserData()
    }

    const handleComplete = async () => {
        await dfltApiCall("POST", COMPLETE, { id })
        await updateUserData()
    }

    if (courseLoader || userLoader) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="primary" />
            </Box>
        )
    }

    return (
        <Box bgcolor={theme.palette.background.default}
            sx={{
                width: '100%',
                pr: 1.5,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" }
            }}
        >
            <Grid container direction="column" spacing={3} sx={{
                margin: "auto",
                padding: isMobile ? "10px" : "20px",
                width: "100%",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "12px",
                boxShadow: theme.shadows[3],
                minHeight: "calc(90vh - 100px)",
            }}>
                {/* Título del curso */}
                <Grid item>
                    <Typography variant={isMobile ? "h5" : "h3"} fontWeight="bold" color="primary">
                        {course.title}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2} mt={1}>
                        <Avatar src={course.user.profilePic} alt={course.user.name} />
                        <Typography variant="body1" fontWeight="medium" color="text.primary">
                            {course.user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {new Date(course.created_at).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Grid>

                {/* Selector de vídeos */}
                {videos.length > 1 && (
                    <Grid item>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {videos.map((video, idx) => (
                                <Button
                                    key={video.id}
                                    variant={activeVideoIndex === idx ? "contained" : "outlined"}
                                    color="primary"
                                    onClick={() => setActiveVideoIndex(idx)}
                                    size="small"
                                >
                                    {video.title || `Video ${idx + 1}`}
                                </Button>
                            ))}
                        </Box>
                    </Grid>
                )}

                {/* Video activo */}
                {videos.length > 0 && (
                    <Grid item>
                        <Box display="flex" justifyContent="center" sx={{ width: "100%", maxHeight: "55vh" }}>
                            <CourseVideo url={videos[activeVideoIndex].file} />
                        </Box>
                    </Grid>
                )}

                {/*Descripción y comentarios*/}
                <VideoInfoBox {...{course, userData}}/>

                {/* Botones de interacción */}
                {followed !== null && ended !== null && (
                    <Grid item sx={{ mt: 2 }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2} sx={{padding: '30px'}}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <IconButton
                                    size="large"
                                    color="secondary"
                                    onClick={() => setLikes(likes + 1)}
                                >
                                    <FavoriteBorder />
                                </IconButton>
                                <Typography variant="body1" color="text.primary">
                                    {likes}
                                </Typography>
                            </Box>

                                <Box display="flex" gap={1}>
                                    {ended ? (
                                        <Button variant="contained" color="success" size="small" onClick={handleFollow}>
                                            Continuar curso
                                        </Button>
                                    ) : followed ? (
                                        <Button variant="contained" color="warning" size="small" onClick={handleComplete}>
                                            Terminar curso
                                        </Button>
                                    ) : (
                                        <Button variant="contained" color="primary" size="small" onClick={handleFollow}>
                                            Seguir curso
                                        </Button>
                                    )}

                                    {(followed || ended) && (
                                        <Button variant="outlined" color="error" size="small" onClick={handleUnfollow}>
                                            Abandonar curso
                                        </Button>
                                    )}
                                </Box>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default Course