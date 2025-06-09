import {
    Box,
    Button,
    Modal,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material"
  import { useNavigate } from "react-router-dom"
  import { useThemeContext } from "../context/ThemeContext"
  
  const EmailVerified = () => {
    const theme = useTheme()
    const { isDarkMode } = useThemeContext()
    const colors = { ...theme.palette }
    const navigate = useNavigate()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  
    const home = import.meta.env.VITE_APP_HOME
  
    return (
      <Modal open disableEscapeKeyDown disableAutoFocus>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: colors.background.paper,
            color: colors.text.primary,
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            width: isMobile ? "90%" : "400px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {`¡Correo verificado!`}
          </Typography>
          <Typography variant="body1" mb={4}>
            {`Tu correo ha sido verificado con éxito. Inicia sesión para comenzar a explorar los cursos.`}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate(home)}
            sx={{ mt: 2 }}
          >
            Ir al inicio
          </Button>
        </Box>
      </Modal>
    )
  }
  
  export default EmailVerified