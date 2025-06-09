import {
  Box,
  Button,
  Typography,
  TextField,
  Avatar,
  CircularProgress,
  Stack,
  IconButton
} from "@mui/material"
import { useEffect, useState } from "react"
import { dfltApiCall } from "../../hooks/api/useApiCall"
import URL from "../../helpers/api_urls"
import { useThemeContext } from "../../context/ThemeContext"
import CommentCard from "./CommentCard"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

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
    setShowContent(true)
  }, [activeTab, courseId])

  return (
    <Box
    sx={{
      border: "1px solid #ccc",
      borderRadius: 2,
      px: 2,
      py: 1,
      mt: 2,
      maxHeight: "350px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      maxWidth: "85dvw", 
      width: "100%",     
      margin: "0 auto"   
    }}
  >
      {/* Tabs + Mostrar/Ocultar */}
      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        <Button
          size="small"
          variant={activeTab === "description" ? "contained" : "outlined"}
          onClick={() => setActiveTab("description")}
        >
          Descripción
        </Button>
        <Button
          size="small"
          variant={activeTab === "comments" ? "contained" : "outlined"}
          onClick={() => setActiveTab("comments")}
        >
          Comentarios
        </Button>
        <IconButton
          onClick={() => setShowContent(prev => !prev)}
          size="small"
          title={showContent ? "Ocultar" : "Mostrar"}
          sx={{ ml: 1, color: theme => theme.palette.primary.main }}
        >
          {showContent ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Stack>

      {/* Contenido visible */}
      {showContent && (
        <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
          {activeTab === "description" && (
            <Typography
              fontSize="0.9rem"
              color="text.secondary"
              sx={{ whiteSpace: "pre-line" }}
            >
              {description || "Este curso no tiene descripción."}
            </Typography>
          )}

          {activeTab === "comments" && (
            <Box>
              {userData && (
                <Stack direction="row" spacing={1} mb={2}>
                  <Avatar src={userData.profilePic} sx={{ width: 30, height: 30 }} />
                  <TextField
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                    multiline
                    minRows={2}
                    size="small"
                  />
                  <Button
                    variant="contained"
                    onClick={handlePostComment}
                    disabled={submitting}
                    size="small"
                  >
                    Publicar
                  </Button>
                </Stack>
              )}

              {loadingComments ? (
                <CircularProgress size={20} />
              ) : (
                <Box display="flex" flexDirection="column" gap={1}>
                  {comments.map(comment => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      currentUserId={userData?.id}
                      onDelete={handleDeleteComment}
                    />
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default VideoInfoBox