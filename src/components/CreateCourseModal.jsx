import { useState } from "react"
import { 
    Box, Button, Modal, TextField, Typography, IconButton, Autocomplete, useTheme, useMediaQuery
} from "@mui/material"
import { Delete } from "@mui/icons-material"
import { ModalBox } from "../StyledComponents"
import { dfltApiCall } from '../hooks/api/useApiCall'
import URL from '../helpers/api_urls'

const { CREATE_COURSE, UPDATE_COURSE } = URL

const CreateCourseModal = ({ open, hndlCl, catData, update, existingCourse = null, updateCourse = null }) => {
    const initialFormState = {
        title: existingCourse ? existingCourse.title : "",
        description: existingCourse ? existingCourse.description : "",
        miniature: null,
        video: [],
        isPrivate: false,
        password: "",
        catArr: existingCourse ? existingCourse.categories : []
    }

    const initialAuxCatArr = existingCourse
        ? catData?.allLevel
            .filter(cat => existingCourse.categories.some(c => c.id === cat.id))
            .map(cat => cat.name)
        : []

    const initialAuxFiles = {
        miniature: existingCourse ? existingCourse.miniature : null,
        video: []
    }

    const [formData, setFormData] = useState(initialFormState)
    const [auxCatArr, setAuxCatArr] = useState(initialAuxCatArr)
    const [auxFiles, setAuxFiles] = useState(initialAuxFiles)
    const [oldVideos, setOldVideos] = useState(existingCourse ? [...existingCourse.videos] : [])

    const theme = useTheme()
    const colors = { ...theme.palette }

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isFormValid =
    formData.title &&
    formData.catArr?.length > 0 &&
    (formData.video.length > 0 || oldVideos.length > 0) &&
    formData.video.every(v => v.indice?.trim()) &&
    oldVideos.every(v => v.title?.trim()) &&
    (!formData.isPrivate || formData.password)

    const resetForm = () => {
        setFormData(initialFormState)
        setAuxCatArr(initialAuxCatArr)
        setAuxFiles(initialAuxFiles)
        setOldVideos(existingCourse ? [...existingCourse.videos] : [])
    }

    const handleClose = () => {
        resetForm()
        hndlCl()
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleCategoryChange = (event, newValue) => {
        setAuxCatArr(newValue)
        const selectedIds = catData.allLevel
            .filter(cat => newValue.includes(cat.name))
            .map(cat => cat.id)
        setFormData(prev => ({
            ...prev,
            catArr: selectedIds
        }))
    }

    const handleFileChange = (event) => {
        const { name, files } = event.target

        if (name === "video") {
            const filesArr = Array.from(files)
            setFormData(prev => ({
                ...prev,
                video: [...prev.video, ...filesArr.map(file => ({ file, indice: "" }))]
            }))
            const previews = []
            let loadedCount = 0
            filesArr.forEach((file) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                    previews.push(e.target.result)
                    loadedCount++
                    if (loadedCount === filesArr.length) {
                        setAuxFiles(prev => ({
                            ...prev,
                            video: [...(prev.video || []), ...previews]
                        }))
                    }
                }
                reader.readAsDataURL(file)
            })
        } else {
            const file = files[0] || null
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    setAuxFiles(prev => ({ ...prev, [name]: e.target.result }))
                }
                reader.readAsDataURL(file)
            } else {
                setAuxFiles(prev => ({ ...prev, [name]: null }))
            }
            setFormData(prev => ({ ...prev, [name]: file }))
        }
    }

    const removeFile = (field, index = null) => {
        if (field === "video" && index !== null) {
            setFormData(prev => ({
                ...prev,
                video: prev.video.filter((_, i) => i !== index)
            }))
            setAuxFiles(prev => ({
                ...prev,
                video: prev.video ? prev.video.filter((_, i) => i !== index) : []
            }))
        } else {
            setFormData(prev => ({ ...prev, [field]: null }))
            setAuxFiles(prev => ({ ...prev, [field]: null }))
        }
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

        formData.video.forEach(({ file, indice }) => {
            dataToSend.append("video[]", file)
            dataToSend.append("indice[]", indice)
        })

        dataToSend.append("isPrivate", formData.isPrivate)
        dataToSend.append("password", formData.password)
        formData.catArr.forEach(id => dataToSend.append("catArr[]", id))

        if (existingCourse) {
            oldVideos.forEach((vid) => {
                dataToSend.append("old_videos[]", JSON.stringify({ id: vid.id, title: vid.title }))
            })
            dfltApiCall('POST', `${UPDATE_COURSE}/${existingCourse.id}`, dataToSend)
                .then(() => {
                    updateCourse()
                    handleClose()
                })
            } else {
                dfltApiCall('POST', CREATE_COURSE, dataToSend)
                    .then(() => {
                        handleClose()
                    })
            }
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalBox sx={{ padding: `20px`, maxHeight: "90vh", overflowY: "auto", width: isMobile ? '90%' : '50%', backgroundColor: colors.background.paper }}>
                <Typography variant={isMobile ? "h6" : "h5"} gutterBottom color="primary">{existingCourse ? "Editar Curso" : "Crear Curso"}</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField fullWidth label="Título" name="title" value={formData.title} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Descripción" name="description" value={formData.description} onChange={handleChange} margin="normal" multiline rows={4} />
                    <Autocomplete multiple options={catData?.allLevel.map(cat => cat.name)} value={auxCatArr} onChange={handleCategoryChange} renderInput={(params) => <TextField {...params} label="Categorías" margin="normal" />} />

                    <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems="center" gap={2} mt={2}>
                        <Button variant="contained" component="label" fullWidth>Subir Miniatura<input type="file" hidden name="miniature" accept="image/*" onChange={handleFileChange} /></Button>
                        {formData.miniature && <IconButton onClick={() => removeFile("miniature")}><Delete color="error" /></IconButton>}
                    </Box>
                    {auxFiles.miniature && <img src={auxFiles.miniature} alt="Miniatura" style={{ width: "100%", marginTop: "10px" }} />}

                    <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems="center" gap={2} mt={2}>
                        <Button variant="contained" component="label" fullWidth>Subir Video<input type="file" hidden name="video" multiple accept="video/*" onChange={handleFileChange} /></Button>
                    </Box>

                    {oldVideos.map((vid, index) => (
                        <Box key={vid.id} mt={1}>
                            <TextField
                                fullWidth
                                label="Índice del video"
                                value={vid.title}
                                onChange={(e) => {
                                    const updatedOldVideos = [...oldVideos]
                                    updatedOldVideos[index].title = e.target.value
                                    setOldVideos(updatedOldVideos)
                                }}
                                sx={{ mt: 1, paddingBottom: '15px' }}
                            />
                            <video controls src={vid.file} style={{ width: "100%" }} />
                            <IconButton onClick={() => {
                                setOldVideos(prev => prev.filter((_, i) => i !== index))
                            }}>
                                <Delete color="error" />
                            </IconButton>
                        </Box>
                    ))}

                    {auxFiles.video?.length > 0 && auxFiles.video.map((src, index) => (
                        <Box key={index} mt={1}>
                            <TextField
                                fullWidth
                                label="Índice del video"
                                value={formData.video[index]?.indice || ""}
                                onChange={(e) => {
                                    const newVideos = [...formData.video]
                                    newVideos[index].indice = e.target.value
                                    setFormData(prev => ({ ...prev, video: newVideos }))
                                }}
                                sx={{ mt: 1, paddingBottom: '15px' }}
                            />
                            <video controls src={src} style={{ width: "100%" }} />
                            <IconButton onClick={() => removeFile("video", index)}>
                                <Delete color="error" />
                            </IconButton>
                        </Box>
                    ))}

                    {formData.isPrivate && <TextField fullWidth label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" required />}

                    <Button type="submit" variant="contained" fullWidth disabled={!isFormValid} sx={{ mt: 3, bgcolor: theme.palette.primary, color: "white", fontWeight: "bold", "&:hover": { bgcolor: theme.palette.secondary.dark } }}>
                        {existingCourse ? 'Actualizar curso' : 'Crear Curso'}
                    </Button>
                </Box>
            </ModalBox>
        </Modal>
    )
}

export default CreateCourseModal
