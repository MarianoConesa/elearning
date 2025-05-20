import { Avatar, Box, Button, CircularProgress, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { FavoriteBorder } from "@mui/icons-material"
import { useState } from "react"
import ReactPlayer from 'react-player'
import CourseVideo from "../../components/CourseVideo"

const Course = ({ id, course, courseLoader }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [likes, setLikes] = useState(course?.message?.likes || 0)

    if (courseLoader) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="primary" />
            </Box>
        )
    }

    return (
        <Box bgcolor={"theme.palette.background.default"}>
            {/* Contenido principal del curso */}
            <Grid
                container
                direction="column"
                spacing={3}
                sx={{
                    // maxWidth: "1200px",
                    margin: "auto",
                    padding: isMobile ? "10px" : "20px",
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "12px",
                    boxShadow: theme.shadows[3],
                    minHeight: "calc(90vh - 100px)", // Ajusta si el header es más alto o diferente
                }}
            >
                {/* Información del curso */}
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

                {/* Video del curso */}
                {course.video && (
                    <Grid item>
                        <Box display="flex" justifyContent="center" sx={{ width: "100%", maxHeight: "55vh", backgroundColor: "red", overflow: 'auto' }}>
                            {/* <video
                                controls
                                style={{
                                    width: "100%",
                                    // maxWidth: "900px",
                                    maxHeight: "600px",
                                    borderRadius: "12px",
                                    boxShadow: theme.shadows[3],
                                }}
                            >
                                <source src={course.video} type="video/mp4" />
                                Tu navegador no soporta la reproducción de videos.
                            </video> */}
                            <CourseVideo
                                url={course.video}
                                markers={[
                                    { time: 10, label: "Introducción" },
                                    { time: 45, label: "Teoría principal" },
                                    { time: 120, label: "Ejemplo práctico" },
                                    { time: 180, label: "Conclusión" },
                                ]}
                            />
                        </Box>
                    </Grid>
                )}

                {/* Botones de interacción */}
                <Grid item sx={{ marginTop: "auto" }}>
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
                        <Button variant="contained" color="primary" size={isMobile ? "small" : "medium"} sx={{ borderRadius: "8px" }}>
                            Inscribirse
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Course
