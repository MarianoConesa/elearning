import { useState } from "react"
import { 
    Box, Button, Modal, Switch, TextField, Typography, IconButton, Autocomplete, useTheme, useMediaQuery
} from "@mui/material"
import { Delete } from "@mui/icons-material"
import { ModalBox } from "../StyledComponents"
import { dfltApiCall } from '../hooks/api/useApiCall'
import URL from '../helpers/api_urls'

const { CREATE_COURSE } = URL

const CreateCourseModal = ({ open, hndlCl, categories, update }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        miniature: null,
        video: null,
        isPrivate: false,
        password: "",
        catArr: []
    })
    const [auxCatArr, setAuxCatArr] = useState([])
    const [auxFiles, setAuxFiles] = useState({ miniature: null, video: null })

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isFormValid = formData.title && formData.catArr.length > 0 && (!formData.isPrivate || formData.password)

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleCategoryChange = (event, newValue) => {
        setAuxCatArr(newValue)
    
        const selectedIds = categories.allLevel
            .filter(cat => newValue.includes(cat.name)) 
            .map(cat => cat.id)
    
        setFormData(prevState => ({
            ...prevState,
            catArr: selectedIds
        }))
    }
    
    const handleFileChange = (event) => {
        const { name, files } = event.target
        const file = files[0] || null
    
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setAuxFiles(prevState => ({
                    ...prevState,
                    [name]: e.target.result
                }))
            }
            reader.readAsDataURL(file)
        } else {
            setAuxFiles(prevState => ({
                ...prevState,
                [name]: null
            }))
        }
    
        setFormData(prevState => ({
            ...prevState,
            [name]: file
        }))
    }
    
    const removeFile = (field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: null
        }))
        setAuxFiles(prevState => ({
            ...prevState,
            [field]: null
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (formData.catArr.length === 0) {
            alert("Debes seleccionar al menos una categoría")
            return
        }

        const dataToSend = new FormData()
        dataToSend.append("title", formData.title)
        dataToSend.append("description", formData.description)
        if (formData.miniature) dataToSend.append("miniature", formData.miniature)
        if (formData.video) dataToSend.append("video", formData.video)
        dataToSend.append("isPrivate", formData.isPrivate)
        dataToSend.append("password", formData.password)
        formData.catArr.forEach(id => dataToSend.append("catArr[]", id))

        dfltApiCall('POST', CREATE_COURSE, dataToSend)
        // update()
        hndlCl()
    }

    return (
        <Modal open={open} onClose={hndlCl}>
            <ModalBox sx={{ padding: `20px`, maxHeight: "90vh", overflowY: "auto", width: isMobile ? '90%' : '50%' }}>
                <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>Crear Curso</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField fullWidth label="Título" name="title" value={formData.title} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Descripción" name="description" value={formData.description} onChange={handleChange} margin="normal" multiline rows={4} />
                    <Autocomplete multiple options={categories.allLevel.map(cat => cat.name)} value={auxCatArr} onChange={handleCategoryChange} renderInput={(params) => <TextField {...params} label="Categorías" margin="normal" />} />
                    
                    <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems="center" gap={2} mt={2}>
                        <Button variant="contained" component="label" fullWidth>Subir Miniatura<input type="file" hidden name="miniature" onChange={handleFileChange} /></Button>
                        {formData.miniature && <IconButton onClick={() => removeFile("miniature")}><Delete color="error" /></IconButton>}
                    </Box>
                    {auxFiles.miniature && <img src={auxFiles.miniature} alt="Miniatura" style={{ width: "100%", marginTop: "10px" }} />}
                    
                    <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems="center" gap={2} mt={2}>
                        <Button variant="contained" component="label" fullWidth>Subir Video<input type="file" hidden name="video" onChange={handleFileChange} /></Button>
                        {formData.video && <IconButton onClick={() => removeFile("video")}><Delete color="error" /></IconButton>}
                    </Box>
                    {auxFiles.video && <video controls src={auxFiles.video} style={{ width: "100%", marginTop: "10px" }} />}
                    
                    <Box display="flex" alignItems="center" mt={2}>
                        <Switch checked={formData.isPrivate} name="isPrivate" onChange={handleChange} />
                        <Typography>Privado</Typography>
                    </Box>
                    {formData.isPrivate && <TextField fullWidth label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" required />}
                    
                    <Button type="submit" variant="contained" fullWidth disabled={!isFormValid} sx={{ mt: 3, bgcolor: theme.palette.secondary.main, color: "white", fontWeight: "bold", "&:hover": { bgcolor: theme.palette.secondary.dark } }}>Crear Curso</Button>
                </Box>
            </ModalBox>
        </Modal>
    )
}

export default CreateCourseModal