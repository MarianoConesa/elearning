import { Avatar, Box, Button, Grid, Icon, IconButton, Menu, MenuItem, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import useModal from "../../hooks/modals/useModal"
import LoginModal from "../loginModals/LoginModal"
import { Person, Search } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useThemeContext } from "../../context/ThemeContext"

const Header = ({ data, loader, userData, userLoader, update }) => {
    const svgImg = data && data[0].file
    const { open: openLogin, handleOpen: hndlOpLogin, handleClose: hndlClLogin } = useModal()
    const [type, setType] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    
    const theme = useTheme()
    const { toggleTheme } = useThemeContext()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Grid container direction="column" sx={{ width: '100%' }}>
            <Grid item sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '10vh',
                padding: '0 10px',
                backgroundColor: colors.primary.main
            }}>
                {/* Logo y título */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon sx={{ height: `10dvh`, width: `10dvh`, paddingRight: '5px' }}>
                        <img style={{ height: '100%', width: '100%' }} src={svgImg} />
                    </Icon>
                    <Typography variant={isMobile ? 'h6' : 'h3'} fontFamily="serif" sx={{ color: colors.logoWhite }}>Elearning</Typography>
                </Box>

                {/* Barra de búsqueda */}
                <Box 
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: '600px',
                        margin: '0 20px',
                        padding: '0 10px',
                        borderRadius: '50px',
                        backgroundColor: colors.background.paper,
                        boxShadow: theme.shadows[1],
                    }}
                >
                    <Search sx={{ color: colors.text.secondary, marginRight: '10px' }} />
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Buscar cursos..."
                        InputProps={{
                            disableUnderline: true, // Elimina la línea inferior del TextField
                            sx: { fontSize: '1rem', color: colors.text.primary },
                        }}
                    />
                </Box>

                {/* Botones de usuario */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {!userData && (
                        <Box>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    marginRight: '5px',
                                    backgroundColor: colors.background.default,
                                    color: colors.text.secondary,
                                    '&:hover': {
                                        color: colors.background.default,
                                    },
                                }}
                                onClick={() => {
                                    hndlOpLogin()
                                    setType('login')
                                }}
                            >
                                <Typography variant="button">Iniciar Sesión</Typography>
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: colors.background.default,
                                    color: colors.text.secondary,
                                    '&:hover': {
                                        color: colors.background.default,
                                    },
                                }}
                                onClick={() => {
                                    hndlOpLogin()
                                    setType('register')
                                }}
                            >
                                <Typography variant="button">Regístrate</Typography>
                            </Button>
                        </Box>
                    )}
                    {!!userData && (
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ width: '40px', height: '40px', marginLeft: '10px', bgcolor: colors.primary.main }}
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
        </Grid>
    )
}

export default Header
