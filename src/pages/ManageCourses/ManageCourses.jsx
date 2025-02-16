import { Grid, Card, Tooltip, useTheme, useMediaQuery } from "@mui/material"
import Header from "../../components/Header/Header"
import { Add } from "@mui/icons-material"
import { useThemeContext } from "../../context/ThemeContext"

const ManageCourses = ({ data, userData, loader, userLoader, update }) => {

    const theme = useTheme()
    const { toggleTheme, isDarkMode } = useThemeContext()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Header {...{ data, userData, loader, userLoader, update }} />
            <Grid item xs={12} sm={6} md={4} sx={{ display: `flex`, justifyContent: `center` }}>
                <Tooltip title="Añadir curso" arrow>
                    <Card 
                        sx={{ 
                            width: { xs: "80vw", sm: "40vw", md: "30vh" }, 
                            height: { xs: "80vw", sm: "40vw", md: "30vh" }, 
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            cursor: "pointer", 
                        }}
                        onClick={() => console.log("Agregar curso")}
                    >
                        <Add sx={{ fontSize: `10vh`, color: colors.primary.main}} />
                    </Card>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default ManageCourses
