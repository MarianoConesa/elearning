import { Person } from "@mui/icons-material"
import { Box, Button, CircularProgress, Modal, TextField, Typography, useTheme } from "@mui/material"
import Avatar from '@mui/material/Avatar'
import { useState } from "react"
import { ModalBox } from "../../StyledComponents"
import URL from "../../helpers/api_urls"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import ProfileImageUploader from "../ProfileImageUploader"

const { LOGIN, REGISTER } = URL

const LoginModal = ({ openLogin, hndlClLogin, type, update }) => {
    const [userData, setUserData] = useState()
    const [loginLoader, setLoginLoader] = useState(false)
    const [errors, setErrors] = useState({})
    const [image, setImage] = useState()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        userName: '',
        repeatPassword: ''
    })

    const theme = useTheme()
    const colors = { ...theme.palette }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const isFormValid = () => {
        if (type === 'login') {
            return formData.email && formData.password
        }
        return formData.email && formData.password && formData.name && formData.userName && formData.repeatPassword
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (type === 'register' && formData.password !== formData.repeatPassword) {
            setErrors({ repeatPass: 'Las contraseñas no coinciden' })
            return
        }

        setErrors({})
        const body = { email: formData.email, password: formData.password }
        const url = type === 'login' ? LOGIN : REGISTER

        if (type === 'register') {
            body.profilePic = image
            if (!image) delete body.profilePic
            body.name = formData.name
            body.username = formData.userName
        }

        try {
            setLoginLoader(true)

            const response = await dfltApiCall('POST', url, body, setUserData, setLoginLoader)

            if (response) {
                hndlClLogin()
                await update()
            } else {
                setErrors({ userNotFound: 'El usuario o la contraseña son incorrectos' })
            }
        } catch (error) {
            console.error('Error durante la solicitud:', error)
        }
    }

    return (
        <Modal open={openLogin} onClose={hndlClLogin}>
            <ModalBox sx={{ padding: `20px` }}>
                <Box sx={{ padding: `5%`, display: `flex`, flexDirection: `column`, alignItems: `center` }}>
                    {type === 'login' ?
                        <Avatar sx={{ padding: `4%`, marginBottom: `5%`, bgcolor: colors.primary.main }}>
                            {!loginLoader ? <Person sx={{ height: `200%`, width: `150%` }} /> : <CircularProgress />}
                        </Avatar>
                        : <ProfileImageUploader {...{ image, setImage }} />
                    }
                    {type === 'login' && <Typography component="h1" variant="h5">
                        {`Inicio de sesión`}
                    </Typography>}
                </Box>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {type === 'register' &&
                        <Box sx={{ display: `flex` }}>
                            <TextField sx={{ width: `45%`, marginRight: `10%` }}
                                margin="normal"
                                required
                                id="name"
                                label="Nombre"
                                name="name"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <TextField sx={{ width: `45%` }}
                                margin="normal"
                                required
                                name="userName"
                                label="Nombre de usuario"
                                type="text"
                                id="userName"
                                autoComplete="username"
                                value={formData.userName}
                                onChange={handleChange}
                            />
                        </Box>
                    }
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {type === 'register' && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="repeatPassword"
                            label="Repetir Contraseña"
                            type="password"
                            id="repeatPassword"
                            autoComplete="new-password"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            error={!!errors.repeatPass}
                            helperText={errors.repeatPass ?? ''}
                        />
                    )}

                    {errors?.userNotFound && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {errors.userNotFound}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!isFormValid()}
                        sx={{
                            mt: 3, mb: 2,
                            backgroundColor: isFormValid() ? colors.primary.main : colors.grey[400],
                            color: isFormValid() ? colors.logoWhite : colors.text.secondary,
                            '&:hover': isFormValid() ? { backgroundColor: colors.primary.main, color: colors.text.primary } : {}
                        }}
                    >
                        {type === 'login' ? 'Iniciar sesión' : 'Registrarme'}
                    </Button>
                </Box>
            </ModalBox>
        </Modal>
    )
}

export default LoginModal
