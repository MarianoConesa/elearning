import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Checkbox,
  ListItemIcon,
  Divider,
  IconButton,
  Box,
  Typography
} from "@mui/material"
import { ExpandLess, ExpandMore, Close, Delete } from "@mui/icons-material"
import { useState } from "react"

const FilterDrawer = ({ open, onClose, level_1, selected, onSelect }) => {
  const [openCategories, setOpenCategories] = useState({})

  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const isSelected = (id) => selected.includes(id)

  const toggleSelect = (id) => {
    const newSelection = isSelected(id)
      ? selected.filter((i) => i !== id)
      : [...selected, id]
    onSelect(newSelection)
  }

  const clearFilters = () => onSelect([])

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 300 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1.5
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Filtrar por categoría
          </Typography>

          <Box>
            {selected.length > 0 && (
              <IconButton
                size="small"
                onClick={clearFilters}
                title="Limpiar filtros"
                sx={{ color: "error.main" }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small" onClick={onClose} title="Cerrar">
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Divider />

        {/* Categorías */}
        <List>
          {level_1?.map((category) => (
            <div key={category.id}>
              <ListItemButton onClick={() => toggleCategory(category.id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isSelected(category.id)}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSelect(category.id)
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={category.name} />
                {category.child?.length > 0 ? (
                  openCategories[category.id] ? <ExpandLess /> : <ExpandMore />
                ) : null}
              </ListItemButton>

              <Collapse in={openCategories[category.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {category.child.map((sub) => (
                    <ListItemButton
                      key={sub.id}
                      sx={{ pl: 6 }}
                      onClick={() => toggleSelect(sub.id)}
                    >
                      <ListItemIcon>
                        <Checkbox edge="start" checked={isSelected(sub.id)} />
                      </ListItemIcon>
                      <ListItemText primary={sub.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default FilterDrawer
