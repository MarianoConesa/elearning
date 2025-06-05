import { Person } from "@mui/icons-material"
import { Alert, Box, Button, CircularProgress, Modal, TextField, Typography, useTheme } from "@mui/material"
import Avatar from '@mui/material/Avatar'
import { useState } from "react"
import { ModalBox } from "../../StyledComponents"
import URL from "../../helpers/api_urls"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import ProfileImageUploader from "../ProfileImageUploader"

const { LOGIN, REGISTER, FORGOT_PASSWORD } = URL

const LoginModal = ({ openLogin, hndlClLogin, type, update }) => {
    const [userData, setUserData] = useState()
    const [loginLoader, setLoginLoader] = useState(false)
    const [errors, setErrors] = useState({})
    const [image, setImage] = useState()
    const [verificationSent, setVerificationSent] = useState(false)
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
        return formData.email &&
               formData.password.length >= 6 &&
               formData.name &&
               formData.userName &&
               formData.repeatPassword &&
               formData.password === formData.repeatPassword
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (type === 'register') {
            let newErrors = {};
            if (formData.password.length < 6) {
                newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
            }
            if (formData.password !== formData.repeatPassword) {
                newErrors.repeatPass = 'Las contraseñas no coinciden';
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
        }

        setErrors({});
        setVerificationSent(false)
        const body = { email: formData.email, password: formData.password };
        const registerBody = new FormData();
        const url = type === 'login' ? LOGIN : REGISTER;

        if (type === 'register') {
            registerBody.append('name', formData.name);
            registerBody.append('email', formData.email);
            registerBody.append('username', formData.userName);
            registerBody.append('password', formData.password);
            image && registerBody.append('profilePic', image);
        }

        const bodyToSend = type === 'login' ? body : registerBody;

        try {
            setLoginLoader(true);
            const response = await dfltApiCall('POST', url, bodyToSend, setUserData, setLoginLoader);

            if (response?.errors) {
                const fieldErrors = {};
                Object.entries(response.errors).forEach(([field, messages]) => {
                    fieldErrors[field] = messages[0];
                });
                setErrors(fieldErrors);
                return;
            }

            if (response?.error) {
                setErrors({ server: response.error });
                return;
            }

            if (!response) {
                setErrors({ server: 'Ocurrió un error inesperado. Intenta más tarde.' });
                return;
            }

            if (type === 'register') {
                setVerificationSent(true);
                return;
            }

            hndlClLogin();
            await update();

        } catch (error) {
            console.error('Error durante la solicitud:', error);
            setErrors({ server: 'Error de conexión con el servidor.' });
        } finally {
            setLoginLoader(false);
        }
    }

    const handleForgotPassword = async () => {
        if (!formData.email) {
            setErrors({ userNotFound: 'Introduce tu email para recuperar la contraseña' })
            return
        }

        try {
            setLoginLoader(true)
            const body = { email: formData.email }

            const response = await dfltApiCall("POST", FORGOT_PASSWORD, body)

            if (response) {
                alert("Se ha enviado un correo con instrucciones para recuperar tu contraseña.")
            }
        } catch (error) {
            console.error("Error al enviar email de recuperación:", error)
            alert("No se pudo enviar el correo de recuperación. Inténtalo más tarde.")
        } finally {
            setLoginLoader(false)
        }
    }

    return (
        <Modal open={openLogin} onClose={hndlClLogin}>
            <ModalBox sx={{ padding: `20px` }}>
                <Box sx={{ padding: `5%`, display: `flex`, flexDirection: `column`, alignItems: `center` }}>
                    {type === 'login' ? (
                        <Avatar sx={{ padding: `4%`, marginBottom: `5%`, bgcolor: colors.primary.main }}>
                            {!loginLoader ? <Person sx={{ height: `200%`, width: `150%` }} /> : <CircularProgress />}
                        </Avatar>
                    ) : (
                        <ProfileImageUploader {...{ image, setImage }} />
                    )}
                    {type === 'login' && (
                        <Typography component="h1" variant="h5">
                            {`Inicio de sesión`}
                        </Typography>
                    )}
                </Box>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {verificationSent && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                            Registro exitoso. Revisa tu correo para verificar tu cuenta.
                        </Alert>
                    )}

                    {type === 'register' && (
                        <Box sx={{ display: `flex` }}>
                            <TextField
                                sx={{ width: `45%`, marginRight: `10%` }}
                                margin="normal"
                                required
                                id="name"
                                label="Nombre"
                                name="name"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                disabled={verificationSent}
                            />
                            <TextField
                                sx={{ width: `45%` }}
                                margin="normal"
                                required
                                name="userName"
                                label="Nombre de usuario"
                                type="text"
                                id="userName"
                                autoComplete="username"
                                value={formData.userName}
                                onChange={handleChange}
                                error={!!errors.username}
                                helperText={errors.username}
                                disabled={verificationSent}
                            />
                        </Box>
                    )}

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
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={verificationSent}
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
                        error={!!errors.password}
                        helperText={errors.password ?? (type === 'register' ? 'Mínimo 6 caracteres' : '')}
                        disabled={verificationSent}
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
                            helperText={errors.repeatPass}
                            disabled={verificationSent}
                        />
                    )}

                    {(errors?.userNotFound || errors?.server) && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {errors.userNotFound || errors.server}
                        </Typography>
                    )}

                    <a href={`${import.meta.env.VITE_APP_API}/auth/google/redirect`}>
                        Iniciar sesión con Google
                    </a>

                    {type === 'login' && (
                        <Button
                            onClick={handleForgotPassword}
                            fullWidth
                            variant="text"
                            sx={{ textTransform: "none", color: colors.primary.main }}
                            disabled={loginLoader}
                        >
                            He olvidado mi contraseña
                        </Button>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!isFormValid() || loginLoader || verificationSent}
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: (!isFormValid() || verificationSent) ? colors.grey[400] : colors.primary.main,
                            color: (!isFormValid() || verificationSent) ? colors.text.secondary : colors.logoWhite,
                            '&:hover': (!isFormValid() || verificationSent)
                                ? {}
                                : { backgroundColor: colors.primary.main, color: colors.text.primary },
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
