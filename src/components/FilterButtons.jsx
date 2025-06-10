import { FilterList } from "@mui/icons-material"
import { Box, IconButton, Tooltip } from "@mui/material"
import FilterDrawer from "./FilterDrawer"
import { useState } from "react"

const FilterButtons = ({ catData, filterCat, setFilterCat }) => {
    const [filterOpen, setFilterOpen] = useState(false)

    const handleOpenFilters = () => setFilterOpen(true)
    const handleCloseFilters = () => setFilterOpen(false)

    return (
        <Box>
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
                        <FilterList color="primary"/>
                    </IconButton>
                </Tooltip>
            </Box>

            <FilterDrawer
                open={filterOpen}
                onClose={handleCloseFilters}
                level_1={catData?.level_1}
                selected={filterCat}
                onSelect={setFilterCat}
            />
        </Box>
    )
}

export default FilterButtons
