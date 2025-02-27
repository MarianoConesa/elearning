import { Box, Typography, Card, CardMedia, CardContent, Avatar, IconButton, useMediaQuery } from "@mui/material"
import { FavoriteBorder } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"

const CourseCard = ({ course }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Card sx={{ 
            maxWidth: 600, 
            borderRadius: "12px", 
            boxShadow: theme.shadows[3],
            width: isMobile ? "80vw" : "40vh", 
            height: isMobile ? "80vw" : "30vh", 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center", 
            cursor: "pointer", 
            transition: "0.3s",
            '&:hover': { boxShadow: theme.shadows[6] }
        }}>
            <CardMedia 
                component="img" 
                height="180" 
                image={course.miniature} 
                alt={course.title} 
            />
            <CardContent sx={{ display: "flex", gap: 2 }}>
                <Avatar src={course.user?.profilePic} alt={course.user?.name} />
                <Box>
                    <Typography variant="h6" noWrap>{course.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{new Date(course.created_at).toLocaleDateString()}</Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <IconButton size="small" color="secondary">
                            <FavoriteBorder />
                        </IconButton>
                        <Typography variant="body2">{course.likes} likes</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CourseCard
