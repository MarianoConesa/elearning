import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from "@mui/material"
import CourseCardsMenu from "../../components/CourseCardsMenu"
import { useThemeContext } from "../../context/ThemeContext"
  
  const ForeignProfile = ({ user, courses, loading, catData, filterCat, setFilterCat, url, fetchCourses, setCourses }) => {
    const { isSmallScreen } = useThemeContext()
  
    if (loading || !user)
      return <CircularProgress sx={{ mt: 4, display: "block", mx: "auto" }} />
  
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Perfil */}
        <Grid container spacing={2} justifyContent="center" maxWidth="md" mx="auto">
          <Grid item xs={12} textAlign="center">
            <Avatar
              src={user.profilePic}
              sx={{
                width: isSmallScreen ? 120 : 200,
                height: isSmallScreen ? 120 : 200,
                margin: "0 auto"
              }}
            />
            <Typography variant="h6" mt={2} color="primary">
              {user.name}
            </Typography>
          </Grid>
  
          <Grid item xs={12}>
            <TextField fullWidth label="Usuario" value={user.username} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Nombre completo" value={user.name} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" value={user.email} disabled />
          </Grid>
        </Grid>
  
        {/* Cursos */}
        <Box sx={{ mt: 6, px: { xs: 2, md: 6 } }}>
          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            align="center"
            mb={4}
            sx={{ color: theme => theme.palette.primary.main }}
          >
            Cursos de {user.name}
          </Typography>
  
          {courses?.length > 0 ? (
            <CourseCardsMenu
              courses={courses}
              setCourses={setCourses}
              url={url}
              catData={catData}
              filterCat={filterCat}
              setFilterCat={setFilterCat}
              fetchCourses={fetchCourses}
            />
          ) : (
            <Typography align="center" color="text.secondary">
              Este usuario aún no ha creado ningún curso.
            </Typography>
          )}
        </Box>
      </Container>
    )
  }
  
  export default ForeignProfile
  