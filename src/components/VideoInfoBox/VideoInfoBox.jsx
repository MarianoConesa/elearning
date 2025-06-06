import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Typography,
  TextField,
  Avatar,
  CircularProgress,
  Stack
} from "@mui/material"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import URL from "../../helpers/api_urls"
import { useThemeContext } from "../../context/ThemeContext"
import CommentCard from "./CommentCard"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import IconButton from "@mui/material/IconButton"

const { GET_COMMENTS, CREATE_COMMENT, REMOVE_COMMENT } = URL

const VideoInfoBox = ({ course, userData }) => {
  const [activeTab, setActiveTab] = useState("description")
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [showContent, setShowContent] = useState(true)

  const { isSmallScreen } = useThemeContext()

  const courseId = course.id
  const description = course.description

  const fetchComments = async () => {
    setLoadingComments(true)
    try {
      const response = await dfltApiCall("GET", `${GET_COMMENTS}/${courseId}`)
      setComments(response)
    } catch (err) {
      console.error("Error cargando comentarios", err)
    } finally {
      setLoadingComments(false)
    }
  }

  const handlePostComment = async () => {
    if (!newComment.trim()) return
    setSubmitting(true)
    try {
      const response = await dfltApiCall("POST", CREATE_COMMENT, {
        course_id: courseId,
        content: newComment
      })
      setComments([response, ...comments])
      setNewComment("")
    } catch (err) {
      console.error("Error enviando comentario", err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentToDelete) => {
    try {
      await dfltApiCall("DELETE", `${REMOVE_COMMENT}/${commentToDelete.id}`)
      setComments(prev => prev.filter(c => c.id !== commentToDelete.id))
    } catch (err) {
      console.error("Error eliminando comentario", err)
    }
  }

  useEffect(() => {
    if (activeTab === "comments") {
      fetchComments()
    }
    setShowContent(true) // Al cambiar de tab, mostrar contenido por defecto
  }, [activeTab, courseId])

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        p: isSmallScreen ? 1 : 2,
        mt: isSmallScreen ? 1 : 2,
      }}
    >
      {/* Tabs + Mostrar/Ocultar */}
      <Stack direction="row" spacing={1} mb={2} alignItems="center">
        <Button
          size={isSmallScreen ? "small" : "medium"}
          variant={activeTab === "description" ? "contained" : "outlined"}
          onClick={() => setActiveTab("description")}
        >
          Descripción
        </Button>
        <Button
          size={isSmallScreen ? "small" : "medium"}
          variant={activeTab === "comments" ? "contained" : "outlined"}
          onClick={() => setActiveTab("comments")}
        >
          Comentarios
        </Button>
        <IconButton
        onClick={() => setShowContent(prev => !prev)}
        size="small"
        title={showContent ? "Ocultar" : "Mostrar"}
        aria-label={showContent ? "Ocultar contenido" : "Mostrar contenido"}
        sx={{ ml: 1, color: theme => theme.palette.primary.main }}
        >
        {showContent ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>

      </Stack>

      {/* Descripción */}
      {activeTab === "description" && showContent && (
        <Typography fontSize={isSmallScreen ? "0.9rem" : "1rem"}>
          {description || "Este curso no tiene descripción."}
        </Typography>
      )}

      {/* Comentarios */}
      {activeTab === "comments" && showContent && (
        <Box>
          {userData && (
            <Stack direction="row" spacing={1} mb={2}>
              <Avatar src={userData.profilePic} />
              <TextField
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                multiline
                minRows={2}
                size={isSmallScreen ? "small" : "medium"}
              />
              <Button
                variant="contained"
                onClick={handlePostComment}
                disabled={submitting}
              >
                Publicar
              </Button>
            </Stack>
          )}

          {loadingComments ? (
            <CircularProgress />
          ) : (
            comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                currentUserId={userData?.id}
                onDelete={handleDeleteComment}
              />
            ))
          )}
        </Box>
      )}
    </Box>
  )
}

export default VideoInfoBox
