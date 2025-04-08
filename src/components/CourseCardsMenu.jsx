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
  
  const CourseCardsMenu = ({ catData, courseData, onOpenSort, ...props }) => {
    const theme = useTheme()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  
    const { open, handleOpen: hndlOpn, handleClose: hndlCl } = useModal()

    const [filterOpen, setFilterOpen] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([])

    const handleOpenFilters = () => setFilterOpen(true)
    const handleCloseFilters = () => setFilterOpen(false)

  
    return (
      <Grid
        container
        sx={{ height: "100vh", display: "flex", flexDirection: "column", position: "relative" }}
      >
        {/* Botones superiores */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 10
          }}
        >
          <Tooltip title="Filtrar cursos" arrow>
            <IconButton onClick={handleOpenFilters}>
              <FilterList/>
            </IconButton>
          </Tooltip>
        </Box>
  
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10
          }}
        >
          <Tooltip title="Ordenar cursos" arrow>
            <IconButton onClick={onOpenSort}>
              <Sort />
            </IconButton>
          </Tooltip>
        </Box>
  
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
                    "&:hover": { boxShadow: theme.shadows[6] }
                  }}
                  onClick={() => hndlOpn()}
                >
                  <Add sx={{ fontSize: isMobile ? "10vw" : "10vh", color: colors.primary.main }} />
                </Card>
              </Tooltip>
            </Grid>
  
            {/* Tarjetas de cursos */}
            {courseData && courseData.courses?.map((course) => (
              <Grid item key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Grid>
  
        {!!open && <CreateCourseModal {...{ open, hndlCl, catData }} />}
        <FilterDrawer
        open={filterOpen}
        onClose={handleCloseFilters}
        level_1={catData.level_1}
        selected={selectedCategories}
        onSelect={setSelectedCategories}
        />

      </Grid>
    )
  }
  
  export default CourseCardsMenu
  