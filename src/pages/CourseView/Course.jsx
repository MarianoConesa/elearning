import { Favorite, FavoriteBorder } from "@mui/icons-material"
import {
    Avatar, Box, Button, CircularProgress, Grid,
    IconButton, Typography, useMediaQuery, useTheme
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CourseVideo from "../../components/CourseVideo"
import CreateCourseModal from "../../components/CreateCourseModal"
import VideoInfoBox from "../../components/VideoInfoBox/VideoInfoBox"
import URL from "../../helpers/api_urls"
import { dfltApiCall } from "../../hooks/api/useApiCall"

const { FOLLOW, UNFOLLOW, COMPLETE, LIKE, DISLIKE, REMOVE_COURSE } = URL

const Course = ({ id, course, courseLoader, userData, update, updateUserData, updateCourses, updateCourse, userLoader, catData }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [likes, setLikes] = useState(Number(course?.likes) || 0)

    const [followed, setFollowed] = useState(null)
    const [ended, setEnded] = useState(null)
    const [liked, setLiked] = useState(userData?.liked.includes(Number(id)))
    const owned = userData?.isAdmin || course?.user?.id === userData?.id
    
    const videos = course?.videos || []
    const [activeVideoIndex, setActiveVideoIndex] = useState(0)
    const [editModalOpen, setEditModalOpen] = useState(false)

    const navigate = useNavigate()
    
    useEffect(() => {
        if (userData) {
            setFollowed(userData.followed.includes(Number(id)))
            setEnded(userData.ended.includes(Number(id)))
            setLiked(userData.liked.includes(Number(id)))
        }
    }, [userData, id])

    useEffect(() => {
        setLikes(Number(course?.likes))
    }, [course])
    
    const handleFollow = async () => {
        await dfltApiCall("POST", FOLLOW, { id })
        setFollowed(true)
        setEnded(false)
    }

    const handleUnfollow = async () => {
        await dfltApiCall("POST", UNFOLLOW, { id })
        setFollowed(false)
        setEnded(false)
    }

    const handleComplete = async () => {
        await dfltApiCall("POST", COMPLETE, { id })
        setFollowed(false)
        setEnded(true)
    }

    const handleLike = async () => {
        const route = liked ? DISLIKE : LIKE
        await dfltApiCall("POST", route, { id })
        setLiked(!liked)
        setLikes(prev => liked ? prev - 1 : prev + 1)
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
                minHeight: "calc(90vh - 100px)",
            }}>
                {/* Título del curso */}
                <Grid item>
                    <Typography variant={isMobile ? "h5" : "h3"} fontWeight="bold" color="primary">
                        {course.title}
                    </Typography>
                    {owned && (
                        <Box display="flex" gap={1} mt={1}>
                            <Button 
                                variant="outlined" 
                                size="small" 
                                onClick={() => setEditModalOpen(true)}
                            >
                                Editar curso
                            </Button>
                            <Button 
                                variant="outlined" 
                                size="small" 
                                color="error"
                                onClick={async () => {
                                    const confirmed = window.confirm("¿Estás seguro de que quieres eliminar este curso? Esta acción no se puede deshacer.")
                                    if (confirmed) {
                                        try {
                                            await dfltApiCall("DELETE", `${REMOVE_COURSE}/${id}`)
                                            updateCourses?.()
                                            navigate(-1) // Cambia a la ruta anterior
                                        } catch (error) {
                                            console.error("Error eliminando el curso:", error)
                                            alert("Ocurrió un error al intentar eliminar el curso.")
                                        }
                                    }
                                }}
                            >
                                Eliminar curso
                            </Button>
                        </Box>
                    )}
                    <Box display="flex" alignItems="center" gap={2} mt={1}>
                        <Avatar src={course.user.profilePic} alt={course.user.name}  sx={{cursor: 'pointer'}} 
                        onClick={(event) => {
                                    event.stopPropagation()
                                    navigate(`${import.meta.env.VITE_APP_FOREIGN_PROFILE}${course.user.id}`)
                        }}></Avatar>
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
                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '1100px',
                            mb: 4,
                        }}
                    >
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
                                    color="primary"
                                    onClick={() => handleLike()}
                                >
                                    { !liked ? (<FavoriteBorder />) : (<Favorite/>) }
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
            <CreateCourseModal {...{catData, update, updateCourse}}
                open={editModalOpen}
                hndlCl={() => setEditModalOpen(false)}
                existingCourse={course}
            />
        </Box>
    )
}

export default Course