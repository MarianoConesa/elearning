import { Box, useTheme } from "@mui/material"
import { useState } from "react"

const TABS = [
    { key: 'followed', label: 'Seguidos', color: 'primary.main' },
    { key: 'completed', label: 'Terminados', color: 'success.main' },
    { key: 'owned', label: 'Propios',  color: 'secondary.main' },
]

const ManageCourseTabs = ({ onChange, updateUserData }) => {
    const [selected, setSelected] = useState('followed')
    const theme = useTheme()

    const handleTabClick = (key) => {
        setSelected(key)
        if (onChange) onChange(key)
          updateUserData()
    }

    return (
        <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        bgcolor={theme.palette.background.paper}
        py={2}
        boxShadow={theme.shadows[1]}
        sx={{width: '100%'}}
      >
        {TABS.map(({ key, label, color }) => {
          const isSelected = selected === key
      
          return (
            <Box
              key={key}
              onClick={() => handleTabClick(key)}
              sx={{
                flex: 1, //cada tab ocupa mismo ancho
                textAlign: "center",
                px: 3,
                py: 1,
                borderRadius: 0,
                cursor: "pointer",
                backgroundColor: isSelected ? color : "transparent",
                color: isSelected ? theme.palette.common.white : theme.palette.text.primary,
                fontWeight: isSelected ? "bold" : "normal",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: isSelected ? color : theme.palette.action.hover,
                },
              }}
            >
              {label}
            </Box>
          )
        })}
      </Box>
      
    )
}

export default ManageCourseTabs
