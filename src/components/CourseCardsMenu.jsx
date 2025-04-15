import {
    Grid,
    Card,
    Tooltip,
    IconButton,
    useTheme,
    useMediaQuery,
    Box
  } from "@mui/material"
  import { Add, FilterList, Sort } from "@mui/icons-material"
  import useModal from "../hooks/modals/useModal"
  import CreateCourseModal from "./CreateCourseModal"
  import CourseCard from "./CourseCard"
  import FilterDrawer from "./FilterDrawer"
  import { useState } from "react"
  import AddCourseBtn from "./AddCourseBtn"
import FilterButtons from "./FilterButtons"
  
  const CourseCardsMenu = ({ enableCreate, catData, courseData, filterCat, setFilterCat, ...props }) => {
    const theme = useTheme()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  
    const { open, handleOpen: hndlOpn, handleClose: hndlCl } = useModal()

  
    return (
      <Grid
        container
        sx={{ height: "100vh", display: "flex", flexDirection: "column", position: "relative" }}
      >
        <FilterButtons {...{catData, filterCat, setFilterCat}}/>
  
        <Grid
          item
          xs
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "calc(100vh - 64px)",
            padding: 2,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {/* Botón para añadir curso */}
            {enableCreate && <AddCourseBtn {...{hndlOpn, colors, isMobile, theme}}/>}
  
            {/* Tarjetas de cursos */}
            {courseData && courseData.courses?.filter((course) => (filterCat.length === 0 || course.categories.some(catId => filterCat.includes(catId)))).map((course) => (
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
  
  export default CourseCardsMenu
  