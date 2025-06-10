import {
  Grid,
  useMediaQuery,
  useTheme
} from "@mui/material"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import useModal from "../hooks/modals/useModal"
import AddCourseBtn from "./AddCourseBtn"
import CourseCard from "./CourseCard"
import CreateCourseModal from "./CreateCourseModal"
import FilterButtons from "./FilterButtons"

const CourseCardsMenu = ({
  courses,
  setCourses,
  loader,
  url,
  catData,
  filterCat,
  setFilterCat,
  tab,
  fetchCourses,
  fetchSearchCourse,
  searchTerm,
  perPage = 30,
  ...props
}) => {

  const theme = useTheme()
  const colors = { ...theme.palette }
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const { open, handleOpen: hndlOpn, handleClose: hndlCl } = useModal()

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const loadMore = async () => {
    let result
    if (searchTerm) {
      result = await fetchSearchCourses(setCourses, searchTerm, page, perPage)
    } else {
      result = await fetchCourses(setCourses, page, perPage, url)
    }
  
    if (result) {
      setPage(result.nextPage)
      setHasMore(result.hasPage)
    } else {
      // fallback en caso de error
      setHasMore(false)
    }
  }

  useEffect(() => {
    if (searchTerm) {
      setCourses([])
      setPage(1)
      setHasMore(false)
    }
  }, [searchTerm])

  const filteredCourses = filterCat.length === 0
    ? courses
    : courses.filter(course =>
        course.categories?.some(catId => filterCat.includes(catId))
      )

  return (
    <Grid container sx={{ height: "100vh", flexDirection: "column", position: "relative" }}>
      <FilterButtons {...{ catData, filterCat, setFilterCat }} />

      <Grid
        item
        xs
        sx={{
          flexGrow: 1,
          padding: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <InfiniteScroll
          dataLength={filteredCourses?.length ?? 0}
          next={loadMore}
          hasMore={hasMore}
          loader={<p style={{ textAlign: "center" }}>{`Cargando cursos...`}</p>}
          endMessage={<p style={{ textAlign: "center" }}><b>{`No hay más cursos por mostrar.`}</b></p>}
          scrollableTarget="scrollableDiv"
        >
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {tab === "owned" && <AddCourseBtn {...{ hndlOpn, colors, isMobile, theme }} />}

            {filteredCourses && filteredCourses.map(course => (
              <Grid item key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Grid>

      {!!open && (
        <CreateCourseModal {...{ open, hndlCl, catData, ...props }} />
      )}
    </Grid>
  )
}

export default CourseCardsMenu
