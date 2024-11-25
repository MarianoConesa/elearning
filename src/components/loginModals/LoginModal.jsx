import { Person } from "@mui/icons-material"
import { Box, Button, CircularProgress, Modal, TextField, Typography, useTheme } from "@mui/material"
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from "react"
import { ModalBox } from "../../StyledComponents"
import URL from "../../helpers/api_urls"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import ProfileImageUploader from "../ProfileImageUploader"

const { LOGIN, REGISTER } = URL

const LoginModal = ({openLogin, hndlClLogin, type, update}) =>{
    const [userData, setUserData] = useState()
    const [loginLoader, setLoginLoader] = useState(false)
    const [errors, setErrors] = useState()
    const [image, setImage] = useState()

    const theme = useTheme()
    const colors = { ...theme.palette }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
  
      
      if (type === 'register' && data.get('password') !== data.get('repeatPassword')) {
          setErrors({ ...errors, repeatPass: 'Las contraseñas no coinciden' });
          return;
      }
  
      setErrors();
      const body = { email: data.get('email'), password: data.get('password') };
      const url = type === 'login' ? LOGIN : REGISTER;
  
      if (type === 'register') {
          body.profilePic = image;
          if (!image) delete body.profilePic;
          body.name = data.get('name');
          body.username = data.get('userName');
      }
  
      try {
          setLoginLoader(true);
          await dfltApiCall('POST', url, body, setUserData, setLoginLoader);
  
          await new Promise((resolve) => {
              const interval = setInterval(() => {
                  if (!loginLoader) {
                      clearInterval(interval);
                      resolve();
                  }
              }, 100); // Verificar cada 100ms
          });
  
          hndlClLogin();
          await update();
      } catch (error) {
          console.error('Error durante la solicitud:', error);
      }
  }


return <Modal open={openLogin} onClose={hndlClLogin}>
            <ModalBox sx={{padding: `20px`}}>
                <Box sx={{padding: `5%`, display: `flex`, flexDirection: `column`, alignItems: `center`}}>
                    {type === 'login' ? 
                    <Avatar sx={{ padding: `4%`, marginBottom: `5%`, bgcolor: colors.primary.main }}>
                        {!loginLoader ? <Person sx={{height: `200%`, width: `150%`}}/> : <CircularProgress/>}
                    </Avatar>
                    : <ProfileImageUploader {...{image, setImage}}/>}
                    {type === 'login' && <Typography component="h1" variant="h5">
                        {`Inicio de sesión`}
                    </Typography>}
                </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {type === 'register' && <Box sx={{display: `flex`}}>
            <TextField sx={{width: `45%`, marginRight: `10%`}}
              margin="normal"
              required
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
            />
            <TextField sx={{width: `45%`}}
              margin="normal"
              required
              name="userName"
              label="Nombre de usuario"
              type="userName"
              id="userName"
              autoComplete="userName"
            />
            </Box>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {type === 'register' && (
            <TextField
              error={errors?.repeatPass}
              helperText={errors?.repeatPass ?? ''}
              margin="normal"
              required
              fullWidth
              name="repeatPassword"
              label="Repetir Contraseña"
              type="password"
              id="repeatPassword"
              autoComplete="new-password"
            />
          )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: colors.primary.main, color:colors.logoWhite, '&:hover' : { backgroundColor: colors.primary.main, color: colors.text.primary} }}
            >
              {type === 'login' ? 'Iniciar sesión' : 'Registrarme'}
            </Button>
          </Box>
            </ModalBox>
        </Modal>
}

export default LoginModal