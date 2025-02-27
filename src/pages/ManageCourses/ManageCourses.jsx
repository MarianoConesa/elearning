import { Grid, Card, Tooltip, useTheme, useMediaQuery } from "@mui/material"
import Header from "../../components/Header/Header"
import { Add } from "@mui/icons-material"
import useModal from "../../hooks/modals/useModal"
import CreateCourseModal from "../../components/CreateCourseModal"
import CourseCard from "../../components/CourseCard"

const ManageCourses = ({ categories, courses, ...props }) => {
    const theme = useTheme()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const { open, handleOpen: hndlOpn, handleClose: hndlCl } = useModal()

    return (
        <Grid container sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Grid item xs="auto">
                <Header {...props} />
            </Grid>

            {/* Contenedor principal con scroll */}
            <Grid 
                item 
                xs 
                sx={{ 
                    flexGrow: 1,
                    overflowY: "auto", 
                    maxHeight: "calc(100vh - 64px)", // Ajustar altura restando la del Header
                    padding: 2,
                    display: "flex",
                    justifyContent: "center", // Centrar horizontalmente
                }}
            >
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {/* Botón para añadir curso */}
                    <Grid item>
                        <Tooltip title="Añadir curso" arrow>
                            <Card
                                sx={{
                                    width: isMobile ? "80vw" : "40vh",
                                    height: isMobile ? "80vw" : "30vh",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                                onClick={() => hndlOpn()}
                            >
                                <Add sx={{ fontSize: isMobile ? "10vw" : "10vh", color: colors.primary.main }} />
                            </Card>
                        </Tooltip>
                    </Grid>

                    {/* Tarjetas de cursos */}
                    {courses && courses.map(course => (
                        <Grid item key={course.id}>
                            <CourseCard course={course} />
                        </Grid>
                    ))}

{courses && courses.map(course => (
                        <Grid item key={course.id}>
                            <CourseCard course={course} />
                        </Grid>
                    ))}

{courses && courses.map(course => (
                        <Grid item key={course.id}>
                            <CourseCard course={course} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {!!open && <CreateCourseModal {...{ open, hndlCl, categories }} />}
        </Grid>
    )
}

export default ManageCourses
