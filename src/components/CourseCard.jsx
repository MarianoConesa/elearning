import { Box, Typography, Card, CardMedia, CardContent, Avatar, IconButton, useMediaQuery } from "@mui/material"
import { FavoriteBorder } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"

const CourseCard = ({ course }) => {
    const theme = useTheme()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const navigate = useNavigate()

    return (
        <Card sx={{ 
            maxWidth: 600, 
            borderRadius: "12px", 
            boxShadow: theme.shadows[3],
            width: isMobile ? "80vw" : "40vh", 
            height: isMobile ? "auto" : "40vh",
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "flex-start", 
            //cursor: "pointer", 
            transition: "0.3s",
            '&:hover': { boxShadow: theme.shadows[6] }
        }}
        onClick={() => {navigate(`${import.meta.env.VITE_APP_COURSE}${course.id}`)}}>
            <CardMedia 
                component="img" 
                image={course.miniature} 
                alt={course.title} 
                sx={{
                    width: "100%",  
                    height: isMobile ? "150px" : "200px",
                    objectFit: "cover"
                }}
            />
            <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2, width: "100%" }}>
                <Avatar src={course.user?.profilePic} alt={course.user?.name} />
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                    <Typography variant="h6" noWrap>{course.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{course.user?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{new Date(course.created_at).toLocaleDateString()}</Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <IconButton size="small" color="secondary"
                        onClick={(event) => {
                            event.stopPropagation() // Evita que el Card capture el click
                            console.log("Like clicked")
                        }}>
                            <FavoriteBorder />
                        </IconButton>
                        {course.likes > 0 && <Typography variant="body2">{course.likes}</Typography>}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CourseCard
