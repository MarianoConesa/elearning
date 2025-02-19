import { Grid, Card, Tooltip, useTheme, useMediaQuery } from "@mui/material"
import Header from "../../components/Header/Header"
import { Add } from "@mui/icons-material"
import useModal from "../../hooks/modals/useModal"
import CreateCourseModal from "../../components/CreateCourseModal"

const ManageCourses = ({data, userData, categories, loader, userLoader, catLoader, update}) => {

    const theme = useTheme()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const { open: open, handleOpen: hndlOpn, handleClose: hndlCl } = useModal()
    

    return (
        <Grid container spacing={2}>
            <Header {...{ data, userData, loader, userLoader, update }} />
            <Grid item xs={12} sm={6} md={4} sx={{ display: `flex`, justifyContent: `center` }}>
                <Tooltip title="Añadir curso" arrow>
                    <Card 
                        sx={{ 
                            width: isMobile ? "80vw" : "30vh", 
                            height: isMobile ? "80vw" : "30vh", 
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            cursor: "pointer", 
                        }}
                        onClick={() => hndlOpn()}
                    >
                        <Add sx={{ fontSize: isMobile ? "10vw" : "10vh", color: colors.primary.main}} />
                    </Card>
                </Tooltip>
            </Grid>
            {!!open && <CreateCourseModal {...{ open, hndlCl, categories }} />}
        </Grid>
    )
}

export default ManageCourses
