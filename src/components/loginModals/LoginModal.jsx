import { Person } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Modal, TextField, Typography, useTheme } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import { ModalBox } from "../../StyledComponents";
import URL from "../../helpers/api_urls";
import { dfltApiCall } from "../../hooks/api/useApiCall";
import ProfileImageUploader from "../ProfileImageUploader";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

const { LOGIN, REGISTER, FORGOT_PASSWORD } = URL;

const LoginModal = ({ openLogin, hndlClLogin, type, update }) => {
    const [userData, setUserData] = useState();
    const [loginLoader, setLoginLoader] = useState(false);
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState();
    const [verificationSent, setVerificationSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        userName: '',
        repeatPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        password: false,
        repeatPassword: false
    });

    const theme = useTheme();
    const colors = { ...theme.palette };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const isFormValid = () => {
        if (type === 'login') {
            return formData.email && formData.password;
        }
        return formData.email &&
            formData.password.length >= 6 &&
            formData.name &&
            formData.userName &&
            formData.repeatPassword &&
            formData.password === formData.repeatPassword;
    };

    const handlePasswordToggle = (field) => () => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

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
        setVerificationSent(false);
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
                    fieldErrors[field] = messages.join(' ');
                });
                setErrors(fieldErrors);
                return;
            }

            if (response?.message && !response?.token) {
                setErrors({ message: response.message });
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
    };

    const handleForgotPassword = async () => {
        if (!formData.email) {
            setErrors({ userNotFound: 'Introduce tu email para recuperar la contraseña' });
            return;
        }

        try {
            setLoginLoader(true);
            const body = { email: formData.email };
            const response = await dfltApiCall("POST", FORGOT_PASSWORD, body);

            if (response) {
                alert("Se ha enviado un correo con instrucciones para recuperar tu contraseña.");
            }
        } catch (error) {
            console.error("Error al enviar email de recuperación:", error);
            alert("No se pudo enviar el correo de recuperación. Inténtalo más tarde.");
        } finally {
            setLoginLoader(false);
        }
    };

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

                    {(errors?.server || errors?.message) && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errors.server || errors.message}
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
                        type={showPasswords.password ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password ?? (type === 'register' ? 'Mínimo 6 caracteres' : '')}
                        disabled={verificationSent}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handlePasswordToggle("password")} edge="end">
                                        {showPasswords.password ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    {type === 'register' && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="repeatPassword"
                            label="Repetir Contraseña"
                            type={showPasswords.repeatPassword ? "text" : "password"}
                            id="repeatPassword"
                            autoComplete="new-password"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            error={!!errors.repeatPass}
                            helperText={errors.repeatPass}
                            disabled={verificationSent}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handlePasswordToggle("repeatPassword")} edge="end">
                                            {showPasswords.repeatPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}

                    {(errors?.userNotFound) && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {errors.userNotFound}
                        </Typography>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<GoogleIcon />}
                            href={`${import.meta.env.VITE_APP_API_GOOGLE}/auth/google/redirect`}
                            sx={{
                                textTransform: "none",
                                borderRadius: 5,
                                px: 2,
                                backgroundColor: "#fff",
                                color: "#000",
                                borderColor: "#ccc",
                                "&:hover": {
                                    backgroundColor: "#f7f7f7",
                                    borderColor: "#bbb",
                                },
                            }}
                        >
                            {`Iniciar sesión con Google`}
                        </Button>
                    </Box>

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
    );
};

export default LoginModal;
