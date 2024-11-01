import { Avatar, Box, Button, Grid, Icon, IconButton, Menu, MenuItem, Typography, useMediaQuery, useTheme } from "@mui/material"
import { colors } from "../../helpers/colors"
import useModal from "../../hooks/modals/useModal"
import LoginModal from "../loginModals/LoginModal"
import { Person } from "@mui/icons-material"
import { useState } from "react"
<div className="06 12 02"></div>

const Header = ({ data, loader, userData, userLoader, update }) => {
    const svgImg = data && data[0].file
    const { open: openLogin, handleOpen: hndlOpLogin, handleClose: hndlClLogin } = useModal()
    const { open: openRegi, handleOpen: hndlOpRegi, handleClose: hndlClRegi } = useModal()
    const [type, setType] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Grid container direction="column" sx={{ width: '100%', backgroundColor: colors?.main }}>
            <Grid item sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '10vh',
                padding: '0 10px',
                backgroundColor: colors?.main
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon sx={{ height: `10dvh`, width: `10dvh`, paddingRight: '5px' }}>
                        <img style={{ height: '100%', width: '100%' }} src={svgImg} />
                    </Icon>
                    <Typography variant={isMobile ? 'h6' : 'h3'} fontFamily="serif" sx={{ color: colors.logoWhite }}>Elearning</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {!userData && (
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ marginRight: '5px', backgroundColor: colors.logoWhite, color: colors.textContrast }}
                            onClick={() => {
                                hndlOpLogin()
                                setType('login')
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    )}
                    {!userData && (
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ backgroundColor: colors.logoWhite, color: colors.textContrast }}
                            onClick={() => {
                                hndlOpLogin()
                                setType('register')
                            }}
                        >
                            Registrarme
                        </Button>
                    )}
                    {!!userData && (
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ width: '40px', height: '40px', marginLeft: '10px', bgcolor: colors.main }}
                        >
                            {!userData?.profilePic ? <Person sx={{ height: '100%', width: '100%' }} /> : <Avatar src={userData?.profilePic} />}
                        </IconButton>
                    )}
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                    >
                        <MenuItem onClick={handleClose}>Mis cursos</MenuItem>
                        <MenuItem onClick={handleClose}>Cuenta</MenuItem>
                        <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
                    </Menu>
                </Box>
                {!!openLogin && <LoginModal {...{ openLogin, hndlClLogin, type, update }} />}
            </Grid>
            {/* COMPONENTE DE BUSQUEDA POR HASTAHGS CON BARRA DE BUSQUEDA ARRIBA 
            <Grid item sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '5vh', width: '100%', backgroundColor: colors?.secondary }}>
                <Button sx={{ width: '100%', margin: '5px',backgroundColor: colors.textContrast }}>{`Busqueda`}</Button>
                <Button sx={{ width: '100%', margin: '5px',backgroundColor: colors.textContrast }}>{`Cursos Empezados`}</Button>
                <Button sx={{ width: '100%', margin: '5px',backgroundColor: colors.textContrast }}>{`Cursos Terminados`}</Button>
                <Button sx={{ width: '100%', margin: '5px',backgroundColor: colors.textContrast }}>{`Populares`}</Button>
            </Grid> */}
        </Grid>
    )
}

export default Header
