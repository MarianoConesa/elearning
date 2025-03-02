import { Avatar, Box, Button, CircularProgress, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { FavoriteBorder } from "@mui/icons-material"
import { useState } from "react"

const Course = ({ id, course, courseLoader }) => {
    const theme = useTheme()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [likes, setLikes] = useState(course?.message?.likes || 0)

    if (courseLoader) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Grid
            container
            direction="column"
            spacing={3}
            sx={{
                maxWidth: "1200px",
                margin: "auto",
                padding: isMobile ? "10px" : "20px",
                width: "100%",
            }}
        >
            {/* Miniatura del curso */}
            <Grid item sx={{ width: "100%" }}>
                <Box
                    sx={{
                        width: "100%",
                        height: isMobile ? "200px" : "400px",
                        backgroundImage: `url(${course.miniature})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "12px",
                        boxShadow: theme.shadows[2],
                    }}
                />
            </Grid>

            {/* Información del curso */}
            <Grid item>
                <Typography variant={isMobile ? "h5" : "h3"} fontWeight="bold">
                    {course.title}
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mt={1}>
                    <Avatar src={course.user.profilePic} alt={course.user.name} />
                    <Typography variant="body1">{course.user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(course.created_at).toLocaleDateString()}
                    </Typography>
                </Box>
            </Grid>

            {/* Video del curso */}
            {course.video && (
                <Grid item>
                    <Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
                        <video
                            controls
                            style={{
                                width: "100%",
                                maxWidth: "900px",
                                maxHeight: "500px",
                                borderRadius: "12px",
                                boxShadow: theme.shadows[3],
                            }}
                        >
                            <source src={course.video} type="video/mp4" />
                            Tu navegador no soporta la reproducción de videos.
                        </video>
                    </Box>
                </Grid>
            )}

            {/* Botones de interacción */}
            <Grid item>
                <Box display="flex" alignItems="center" gap={1} justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                            size="large"
                            color="secondary"
                            onClick={() => setLikes(likes + 1)}
                        >
                            <FavoriteBorder />
                        </IconButton>
                        <Typography variant="body1">{likes}</Typography>
                    </Box>
                    <Button variant="contained" size={isMobile ? "small" : "medium"}>
                        Inscribirse
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Course
