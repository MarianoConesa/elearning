import { Avatar, Box, Button, CircularProgress, Grid, Icon, IconButton, Menu, MenuItem, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import useModal from "../../hooks/modals/useModal"
import LoginModal from "../loginModals/LoginModal"
import { DarkMode, LightMode, Person, Search } from "@mui/icons-material"
import { useState } from "react"
import { useThemeContext } from "../../context/ThemeContext"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import URL from "../../helpers/api_urls"
import { useNavigate } from "react-router-dom"

const { LOGOUT } = URL

const Header = ({ initData, loader, userData, userLoader, update, handleSearch }) => {
    const svgImg = initData && initData[0]
    const [searchText, setSearchText] = useState("")
    const { open: openLogin, handleOpen: hndlOpLogin, handleClose: hndlClLogin } = useModal()
    const [type, setType] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    
    const theme = useTheme()
    const { toggleTheme, isDarkMode } = useThemeContext()
    const colors = { ...theme.palette }
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const navigate = useNavigate()
    const myCourses = import.meta.env.VITE_APP_MANAGECOURSES
    const profile = import.meta.env.VITE_APP_USER_PROFILE
    const home = import.meta.env.VITE_APP_HOME
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const logout = async () => {
        try {
            await dfltApiCall('POST', LOGOUT)
            await update()
            handleClose()
        } catch (error) {
            console.error('Error al cerrar sesión', error)
        }
    }

    const handleSearchSubmit = () => {
        //console.log("Buscar:", searchText)  // Aquí puedes poner tu lógica
        handleSearch(searchText)
        setSearchText("")
        navigate(home)
    }
    


    return (
        <Grid container direction="column" sx={{ width: '100%' }}>
            <Grid item sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: isMobile ? 'auto' : '10vh',
                padding: '10px',
                backgroundColor: colors.primary.main
            }}>
                {/* Logo y título */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: isMobile ? '10px' : '0', cursor: "pointer" }} onClick={()=>{navigate(home); update()}}>
                    {!loader && svgImg ? (
                        <Icon sx={{ height: `8vh`, width: `8vh`, paddingRight: '5px' }}>
                            <img style={{ height: '100%', width: '100%' }} src={svgImg} alt="Logo" />
                        </Icon>
                    ) : <CircularProgress sx={{ padding: `10px`, color: colors.logoWhite }}/>}
                    <Typography variant={isMobile ? 'h4' : 'h3'} fontFamily="serif" sx={{ color: colors.logoWhite }}>Elearning</Typography>
                </Box>

                {/* Barra de búsqueda */}
                {!isMobile && (
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
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearchSubmit()
                        }}
                        InputProps={{
                            disableUnderline: true,
                            sx: { fontSize: '1rem', color: colors.text.primary },
                        }}
                    />
                    {searchText.length > 0 && 
                    (<IconButton onClick={handleSearch}>
                        <SendIcon sx={{ color: colors.text.secondary, fontSize: '0.70em' }} />
                    </IconButton>)}
                </Box>
                )}

                {/* Botones de usuario */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {!userData && (
                        <Box>
                            <Button variant="contained" size="small" sx={{ marginRight: '5px' }} onClick={() => { hndlOpLogin(); setType('login'); }}>Iniciar Sesión</Button>
                            <Button variant="contained" size="small" onClick={() => { hndlOpLogin(); setType('register'); }}>Regístrate</Button>
                        </Box>
                    )}
                    {!!userData && (
                        <IconButton onClick={handleClick} sx={{ width: '40px', height: '40px', marginLeft: '10px', bgcolor: colors.primary.main }}>
                            {!userData?.profilePic ? <Person sx={{ height: '100%', width: '100%', color: colors.logoWhite }} /> : <Avatar src={userData?.profilePic} />}
                        </IconButton>
                    )}
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                        <MenuItem onClick={() => {handleClose(); navigate(myCourses);}}>Mis cursos</MenuItem>
                        <MenuItem onClick={() => {handleClose(); navigate(profile);}}>Cuenta</MenuItem>
                        <MenuItem onClick={() => {logout(); navigate(home)}}>Cerrar sesión</MenuItem>
                    </Menu>
                    <IconButton onClick={toggleTheme}>{!isDarkMode ? <LightMode sx={{color: colors.logoWhite}}/> : <DarkMode/>}</IconButton>
                </Box>
                {!!openLogin && <LoginModal {...{ openLogin, hndlClLogin, type, update }} />}
            </Grid>
        </Grid>
    )
}

export default Header
