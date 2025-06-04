import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography
} from "@mui/material"
import { useState } from "react"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import URL from "../../helpers/api_urls"
import ProfileImageUploader from "../../components/ProfileImageUploader"

const { UPDATE_USER_INFO } = URL

const Profile = ({ userData, userLoader, updateUserData }) => {
    const [formData, setFormData] = useState({
        username: userData?.username || "",
        name: userData?.name || "",
        profilePic: userData?.profilePic || ""
    })
    const [image, setImage] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [saving, setSaving] = useState(false)

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const body = new FormData()
            body.append("username", formData.username)
            body.append("name", formData.name)
            if (image) body.append("profilePic", image)

            await dfltApiCall("POST", UPDATE_USER_INFO, body)
            await updateUserData()
            setEditMode(false)
        } catch (err) {
            console.error("Error actualizando el perfil", err)
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
        setEditMode(false)
    }

    if (userLoader || !userData) {
        return <CircularProgress />
    }

    return (
        <Grid container spacing={2} sx={{ maxWidth: 600, margin: "0 auto", mt: 4 }}>
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
                <Typography variant="subtitle2" color="textSecondary">
                    Email
                </Typography>
                <Typography variant="body1">
                    {userData?.email || ""}
                </Typography>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
                {!editMode ? (
                    <Button variant="contained" onClick={() => setEditMode(true)}>
                        Editar perfil
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            disabled={saving}
                            sx={{ marginRight: 2 }}
                        >
                            {saving ? "Guardando..." : "Guardar"}
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </>
                )}
            </Grid>
        </Grid>
    )
}

export default Profile
