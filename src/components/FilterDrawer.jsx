import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Checkbox,
    ListItemIcon,
    Divider
  } from "@mui/material"
  import { ExpandLess, ExpandMore } from "@mui/icons-material"
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
  
    return (
      <Drawer anchor="left" open={open} onClose={onClose}>
        <List sx={{ width: 300 }}>
          <ListItemText sx={{ pl: 2, py: 2 }} primary="Filtrar por categoría" />
          <Divider />
  
          {level_1.map((category) => (
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
      </Drawer>
    )
  }
  
  export default FilterDrawer
  