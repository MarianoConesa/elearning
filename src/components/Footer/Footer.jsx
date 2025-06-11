import { Box, Grid, Icon, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useThemeContext } from "../../context/ThemeContext"

const Footer = () => {
  const theme = useTheme()
  const { isDarkMode } = useThemeContext()
  const colors = { ...theme.palette }
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const logo = isDarkMode ? "/logoIcon.svg" : "/logoIconWhite.svg"
  const navigate = useNavigate()
  const home = import.meta.env.VITE_APP_HOME

  return (
    <Grid container direction="column" sx={{ width: "100%" }}>
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: theme.spacing(2),
          backgroundColor: colors.primary.main,
          flexDirection: isMobile ? "column" : "row",
          textAlign: isMobile ? "center" : "left",
          rowGap: theme.spacing(1),
          minHeight: isMobile ? "auto" : "9vh",
        }}
      >
        {/* Logo y nombre */}
        <Box
          onClick={() => navigate(home)}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mb: isMobile ? theme.spacing(1) : 0,
          }}
        >
          {logo ? (
            <Box
              sx={{
                width: "2.5rem",
                height: "2.5rem",
                mr: 1,
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
          ) : (
            <Typography sx={{ color: colors.logoWhite, mr: 1, fontSize: "1.25rem" }}>
              Elearning
            </Typography>
          )}

          {!isMobile && (
            <Typography
              variant="h6"
              fontFamily="serif"
              sx={{ color: colors.logoWhite }}
            >
              Elearning
            </Typography>
          )}
        </Box>

        {/* Derechos reservados */}
        <Typography
          variant="body2"
          sx={{
            color: colors.logoWhite,
            mt: isMobile ? theme.spacing(1) : 0,
            fontSize: "0.9rem",
          }}
        >
          © 2025 Elearning. Todos los derechos reservados.
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Footer
