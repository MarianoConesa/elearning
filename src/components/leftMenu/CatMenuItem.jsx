import { Grid, IconButton, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from "react"
import PropTypes from 'prop-types'
import { ExpandLess } from "@mui/icons-material"
import { colors } from "../../helpers/colors"

const CatMenuItem = ({ category }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <Grid container sx={{ display: 'flex', flexDirection: 'column', backgroundColor: colors.main, width: '100%' }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '3rem', padding: '0 1rem' }}>
                <Typography sx={{ color: colors.logoWhite, lineHeight: '3rem', width: `100%` }}
                // onClick={() => }
                >{category.name}</Typography>
                {category?.child?.length > 0 && (
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ExpandLess sx={{ color: colors.logoWhite }} /> : <ExpandMoreIcon sx={{ color: colors.logoWhite }} />}
                    </IconButton>
                )}
            </Grid>
            {expanded && category?.child?.map((subCategory) => (
                <CatMenuItem key={subCategory.id} category={subCategory} />
            ))}
        </Grid>
    )
}

export default CatMenuItem
