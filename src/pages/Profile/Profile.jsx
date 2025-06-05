import {
    Avatar,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
    Snackbar,
    Alert,
    IconButton,
    InputAdornment,
    useTheme
} from "@mui/material"
import { useEffect, useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import URL from "../../helpers/api_urls"
import ProfileImageUploader from "../../components/ProfileImageUploader"

const { UPDATE_USER_INFO, UPDATE_USER_PASSWORD } = URL

const Profile = ({ userData, userLoader, updateUserData }) => {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        profilePic: ""
    })
    const [image, setImage] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [changePasswordMode, setChangePasswordMode] = useState(false)
    const [saving, setSaving] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState("success")
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        newPassword_confirmation: "",
    })
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        newPassword_confirmation: false,
    })

    const theme = useTheme()
    const colors = { ...theme.palette }

    useEffect(() => {
        if (userData) {
            setFormData({
                username: userData.username || "",
                name: userData.name || "",
                profilePic: userData.profilePic || ""
            })
            setPasswords({ ...passwords, id: userData.id })
        }
    }, [userData])

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value })
    }

    const handlePasswordChange = (field) => (e) => {
        setPasswords({ ...passwords, [field]: e.target.value })
    }

    const handlePasswordToggle = (field) => () => {
        setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            if (changePasswordMode) {
                // Validaciones antes de guardar
                if (passwords.newPassword.length < 6) {
                    setSnackbarMessage("La nueva contraseña debe tener al menos 6 caracteres.")
                    setSnackbarSeverity("error")
                    setSnackbarOpen(true)
                    setSaving(false)
                    return
                }
                if (passwords.newPassword !== passwords.newPassword_confirmation) {
                    setSnackbarMessage("La confirmación no coincide con la nueva contraseña.")
                    setSnackbarSeverity("error")
                    setSnackbarOpen(true)
                    setSaving(false)
                    return
                }
    
                await dfltApiCall("POST", UPDATE_USER_PASSWORD, passwords)
                setSnackbarMessage("Contraseña actualizada correctamente")
                setSnackbarSeverity("success")
                setSnackbarOpen(true)
                setChangePasswordMode(false)
                setPasswords({ currentPassword: "", newPassword: "", newPassword_confirmation: "" })
            } else {
                const body = new FormData()
                body.append("id", userData.id)
                body.append("username", formData.username)
                body.append("name", formData.name)
                if (image) body.append("profilePic", image)
    
                await dfltApiCall("POST", UPDATE_USER_INFO, body)
                await updateUserData()
                setSnackbarMessage("Perfil actualizado correctamente")
                setSnackbarSeverity("success")
                setSnackbarOpen(true)
                setEditMode(false)
            }
        } catch (err) {
            setSnackbarMessage("Ocurrió un error al guardar.")
            setSnackbarSeverity("error")
            setSnackbarOpen(true)
            console.error("Error guardando cambios", err)
        } finally {
            setSaving(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            username: userData?.username || "",
            name: userData?.name || "",
            profilePic: userData?.profilePic || ""
        })
        setImage(null)
        setPasswords({ currentPassword: "", newPassword: "", newPassword_confirmation: "" })
        setEditMode(false)
        setChangePasswordMode(false)
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false)
    }

    if (userLoader || !userData) return <CircularProgress />

    return (
        <Grid container spacing={2} sx={{ maxWidth: 600, margin: "0 auto", mt: 4 }}>
            {/* Imagen */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
                {!editMode ? (
                    <Avatar
                        src={formData.profilePic}
                        sx={{ width: 200, height: 200, margin: "0 auto" }}
                    />
                ) : (
                    <ProfileImageUploader image={image} setImage={setImage} />
                )}
            </Grid>

            {/* Campos normales */}
            {!changePasswordMode && (
                <>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Usuario"
                            value={formData.username}
                            onChange={handleChange("username")}
                            disabled={!editMode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nombre completo"
                            value={formData.name}
                            onChange={handleChange("name")}
                            disabled={!editMode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={userData?.email}
                            disabled
                        />
                    </Grid>
                </>
            )}

            {/* Campos para cambiar contraseña */}
            {changePasswordMode && (
                <>
                    {["currentPassword", "newPassword", "newPassword_confirmation"].map((field, idx) => (
                        <Grid item xs={12} key={field}>
                            <TextField
                                fullWidth
                                label={
                                    field === "currentPassword"
                                        ? "Contraseña actual"
                                        : field === "newPassword"
                                            ? "Nueva contraseña"
                                            : "Confirmar nueva contraseña"
                                }
                                type={showPasswords[field] ? "text" : "password"}
                                value={passwords[field]}
                                onChange={handlePasswordChange(field)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handlePasswordToggle(field)} edge="end">
                                                {showPasswords[field] ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    ))}
                </>
            )}

            {/* Botones */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
                {!editMode && !changePasswordMode && (
                    <>
                        <Button variant="contained" onClick={() => setEditMode(true)} sx={{ mr: 2 }}>
                            Editar perfil
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => setChangePasswordMode(true)}
                            sx={{ textTransform: "none", color: "primary.main" }}
                        >
                            Cambiar contraseña
                        </Button>
                    </>
                )}

                {(editMode || changePasswordMode) && (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            disabled={saving}
                            sx={{ mr: 2 }}
                        >
                            {saving ? "Guardando..." : "Guardar"}
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </>
                )}
            </Grid>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{
                        backgroundColor: snackbarSeverity === "success" ? colors.success : "#d32f2f",
                        color: "#fff",
                        fontWeight: "bold",
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default Profile
