import {
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  Grid,
  Button,
  useTheme
} from "@mui/material"
import { ChevronRight, ChevronLeft, Clear } from "@mui/icons-material"
import { useState, useMemo } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

const sortOptions = ["Antigüedad", "Popularidad", "Me gustas"]

const Filters = ({ onFilterChange, categories }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sortOption, setSortOption] = useState("")

  const toggleOpen = () => setOpen(prev => !prev)

  const handleCategoryChange = (event) => {
    const selected = event.target.value
    setSelectedCategories(selected)
    onFilterChange({ categories: selected, sort: sortOption })
  }

  const handleSortChange = (event) => {
    const selected = event.target.value
    setSortOption(selected)
    onFilterChange({ categories: selectedCategories, sort: selected })
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSortOption("")
    onFilterChange({ categories: [], sort: "" })
  }

  const panelWidth = useMotionValue(0)
  const buttonX = useTransform(panelWidth, (width) => width)

  // 🔁 Flattens nested categories recursively
  const flattenCategories = (levelList, list = []) => {
    for (const category of levelList) {
      list.push({ id: category.id, name: category.name })
      if (Array.isArray(category.child) && category.child.length > 0) {
        flattenCategories(category.child, list)
      }
    }
    return list
  }

  // 🧠 Memoized flattened category list to prevent recalculation
  const flatCategoryList = useMemo(() => {
    if (!categories?.level_1) return []
    return flattenCategories(categories.level_1)
  }, [categories])

  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: open ? 320 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          background: open ? theme.palette.background.paper : "transparent",
          boxShadow: open ? theme.shadows[3] : "none",
          borderTopRightRadius: open ? 8 : 0,
          borderBottomRightRadius: open ? 8 : 0,
          overflow: "hidden",
          zIndex: 1300,
          width: panelWidth
        }}
      >
        {open && (
          <Box sx={{ width: "100%", height: "100%", padding: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Filtrar por Categoría
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Categorías</InputLabel>
                  <Select
                    multiple
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    renderValue={(selected) =>
                      selected
                        .map(id => flatCategoryList.find(cat => cat.id === id)?.name)
                        .join(", ")
                    }
                  >
                    {flatCategoryList.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        <Checkbox checked={selectedCategories.includes(cat.id)} />
                        <ListItemText primary={cat.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Ordenar por</InputLabel>
                  <Select
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    {sortOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  startIcon={<Clear />}
                  onClick={resetFilters}
                >
                  Limpiar filtros
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </motion.div>

      <motion.div
        style={{
          position: "fixed",
          top: "50%",
          left: buttonX,
          transform: "translateY(-50%)",
          zIndex: 1400
        }}
      >
        <Box
          onClick={toggleOpen}
          sx={{
            width: 40,
            height: 80,
            backgroundColor: theme.palette.primary.main,
            borderTopRightRadius: "40px",
            borderBottomRightRadius: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: theme.shadows[4]
          }}
        >
          <IconButton sx={{ color: "#fff" }}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
      </motion.div>
    </>
  )
}

export default Filters
