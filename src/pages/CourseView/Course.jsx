import { Avatar, Box, Button, CircularProgress, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { FavoriteBorder } from "@mui/icons-material"
import { useState } from "react"
import CourseVideo from "../../components/CourseVideo"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import URL from "../../helpers/api_urls"

const { FOLLOW } = URL

const Course = ({ id, course, courseLoader }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [likes, setLikes] = useState(course?.likes || 0)

    const videos = course?.videos || []
    const [activeVideoIndex, setActiveVideoIndex] = useState(0)

    if (courseLoader) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="primary" />
            </Box>
        )
    }

    return (
        <Box bgcolor={theme.palette.background.default}
            sx={{
                height: "calc(100vh - 64px - 100px)",
                overflowY: "auto",
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

                {/* Botones de interacción */}
                <Grid item sx={{ mt: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
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
                        <Button
                            variant="contained"
                            color="primary"
                            size={isMobile ? "small" : "medium"}
                            sx={{ borderRadius: "8px" }}
                            onClick={() => {
                                dfltApiCall("POST", FOLLOW, { id }, null, null)
                            }}
                        >
                            <Typography>{'Seguir'}</Typography>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Course
