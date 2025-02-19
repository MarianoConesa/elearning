import { useState } from "react"
import { 
    Box, Button, Modal, Switch, TextField, Typography, IconButton, Autocomplete, useTheme 
} from "@mui/material"
import { Delete } from "@mui/icons-material"
import { ModalBox } from "../StyledComponents"
import { dfltApiCall } from '../hooks/api/useApiCall'
import URL from '../helpers/api_urls'

const {CREATE_COURSE} = URL

const CreateCourseModal = ({ open, hndlCl, categories }) => {
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

    const theme = useTheme()
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
        const { name, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0] ? window.URL.createObjectURL(files[0]) : null
        }));
    };
    
    const removeFile = (field) => {
        setFormData(prevState => ({
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

        dfltApiCall('POST', CREATE_COURSE ,formData)
        // hndlCl()
        
        console.log("Form Data Submitted:", formData)
        console.log(formData.video)
    }

    return (
        <Modal open={open} onClose={hndlCl}>
            <ModalBox sx={{
                padding: `20px`,
                maxHeight: "90vh",
                overflowY: "auto"
            }}>
                <Typography variant="h5" gutterBottom>Crear Curso</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Título"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                        <TextField
                            fullWidth
                            label="Descripción"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={4}
                        />
                    <Autocomplete
                        multiple
                        options={categories.allLevel.map(cat => cat.name)}
                        value={formData.auxCatArr}
                        onChange={handleCategoryChange}
                        renderInput={(params) => <TextField {...params} label="Categorías" margin="normal" />}
                    />
                    <Box display="flex" alignItems="center" gap={2} mt={2}>
                        <Button variant="contained" component="label" fullWidth>
                            Subir Miniatura
                            <input type="file" hidden name="miniature" onChange={handleFileChange} />
                        </Button>
                        {formData.miniature && (
                            <IconButton onClick={() => removeFile("miniature")}>
                                <Delete color="error" />
                            </IconButton>
                        )}
                    </Box>
                    {formData.miniature && <img src={formData.miniature} alt="Miniatura" style={{ width: "100%", marginTop: "10px" }} />}
                    <Box display="flex" alignItems="center" gap={2} mt={2}>
                        <Button variant="contained" component="label" fullWidth>
                            Subir Video
                            <input type="file" hidden name="video" onChange={handleFileChange} />
                        </Button>
                        {formData.video && (
                            <IconButton onClick={() => removeFile("video")}>
                                <Delete color="error" />
                            </IconButton>
                        )}
                    </Box>
                    {formData.video && <video controls src={formData.video} style={{ width: "100%", marginTop: "10px" }} />}
                    <Box display="flex" alignItems="center" mt={2}>
                        <Switch checked={formData.isPrivate} name="isPrivate" onChange={handleChange} />
                        <Typography>Privado</Typography>
                    </Box>
                    {formData.isPrivate && (
                        <TextField
                            fullWidth
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    )}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        disabled={!isFormValid} 
                        sx={{ 
                            mt: 3, 
                            bgcolor: theme.palette.secondary.main, 
                            color: "white", 
                            fontWeight: "bold",
                            "&:hover": { bgcolor: theme.palette.secondary.dark }
                        }}
                    >
                        Crear Curso
                    </Button>
                </Box>
            </ModalBox>
        </Modal>
    )
}

export default CreateCourseModal
