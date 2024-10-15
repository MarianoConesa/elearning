import { Grid, IconButton, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CatMenuItem from "./CatMenuItem"
import { useState } from "react"
import PropTypes from 'prop-types'
import { colors } from "../../helpers/colors"
import { ExpandLess } from "@mui/icons-material"

const LeftMenu = ({ categories }) => {
    const [expanded, setExpanded] = useState(false)

    return <Grid container sx={{ display: 'flex', flexDirection: 'column', backgroundColor: colors.main, width: '100%' }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '3rem', padding: '0 1rem' }}>
                <Typography sx={{ color: colors.logoWhite, lineHeight: '3rem' }}>{`Categorias`}</Typography>
                <IconButton onClick={() => setExpanded(!expanded)}>
                    {expanded ? <ExpandLess sx={{ color: colors.logoWhite }} /> : <ExpandMoreIcon sx={{ color: colors.logoWhite }} />}
                </IconButton>
            </Grid>
            {expanded && categories?.level_1?.map((category) => (
                <CatMenuItem key={category.id} category={category} />
            ))}
        </Grid>
}

export default LeftMenu
