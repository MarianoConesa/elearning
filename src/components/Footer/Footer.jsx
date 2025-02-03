import { Box, Grid, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material"
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material"
import { useThemeContext } from "../../context/ThemeContext"

const Footer = ({ data, loader, userData, userLoader, update }) => {
    const theme = useTheme()
    const { isDarkMode } = useThemeContext()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Grid container direction="column" sx={{ width: '100%' }}>
            {/* Pie de página */}
            <Grid item sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 10px',
                backgroundColor: colors.primary.main,
                flexDirection: isMobile ? 'column' : 'row',
                textAlign: isMobile ? 'center' : 'left',
            }}>
                {/* Enlaces de redes sociales */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <IconButton sx={{ color: colors.logoWhite }}>
                        <Facebook />
                    </IconButton>
                    <IconButton sx={{ color: colors.logoWhite }}>
                        <Instagram />
                    </IconButton>
                    <IconButton sx={{ color: colors.logoWhite }}>
                        <LinkedIn />
                    </IconButton>
                    <IconButton sx={{ color: colors.logoWhite }}>
                        <Twitter />
                    </IconButton>
                </Box>

                {/* Información de derechos */}
                <Typography variant="body2" sx={{ color: colors.logoWhite, marginTop: isMobile ? '15px' : '0' }}>
                    © 2025 Elearning. Todos los derechos reservados.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Footer
