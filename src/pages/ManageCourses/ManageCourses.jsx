import { Grid, Card, Tooltip, useTheme, useMediaQuery } from "@mui/material"
import Header from "../../components/Header/Header"
import { Add } from "@mui/icons-material"
import useModal from "../../hooks/modals/useModal"
import CreateCourseModal from "../../components/CreateCourseModal"
import CourseCard from "../../components/CourseCard"

const ManageCourses = ({ catData, courseData, ...props }) => {
    const theme = useTheme()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const { open, handleOpen: hndlOpn, handleClose: hndlCl } = useModal()

    return (
        <Grid container sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Grid 
                item 
                xs 
                sx={{ 
                    flexGrow: 1,
                    overflowY: "auto", 
                    maxHeight: "calc(100vh - 64px)",
                    padding: 2,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {/* Botón para añadir curso */}
                    <Grid item>
                        <Tooltip title="Añadir curso" arrow>
                            <Card
                                sx={{
                                    width: isMobile ? "80vw" : "40vh", 
                                    height: isMobile ? "auto" : "40vh",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    maxWidth: 600,
                                    borderRadius: "12px", 
                                    boxShadow: theme.shadows[3],
                                    transition: "0.3s",
                                    '&:hover': { boxShadow: theme.shadows[6] }
                                }}
                                onClick={() => hndlOpn()}
                            >
                                <Add sx={{ fontSize: isMobile ? "10vw" : "10vh", color: colors.primary.main }} />
                            </Card>
                        </Tooltip>
                    </Grid>

                    {/* Tarjetas de cursos */}
                    {courseData && courseData.courses?.map(course => (
                        <Grid item key={course.id}>
                            <CourseCard course={course} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {!!open && <CreateCourseModal {...{ open, hndlCl, catData }} />}
        </Grid>
    )
}

export default ManageCourses
