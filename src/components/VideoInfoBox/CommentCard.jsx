import { Box, Avatar, Typography, Button, Stack } from "@mui/material"
import dayjs from "dayjs"
import "dayjs/locale/es"
import { useThemeContext } from "../../context/ThemeContext"

dayjs.locale("es")

const CommentCard = ({ comment, currentUserId, onDelete }) => {
  const isOwner = currentUserId === comment.user?.id
  const formattedDate = dayjs(comment.created_at).format("D [de] MMMM [de] YYYY, HH:mm")
  const { isSmallScreen } = useThemeContext()

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        mb: 2,
        backgroundColor: "#fafafa"
      }}
    >
      <Stack direction="row" spacing={2}>
        <Avatar src={comment.user?.profilePic} />
        <Box flex={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight="bold">{comment.user?.username}</Typography>
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
          </Stack>
          <Typography sx={{ mt: 0.5 }}>{comment.content}</Typography>

          {isOwner && (
            <Box mt={2} display="flex" justifyContent="flex-start">
              <Button
                onClick={() => onDelete(comment)}
                variant="text"
                sx={{
                  textTransform: "none",
                  color: theme => theme.palette.error.main,
                  fontSize: isSmallScreen ? "0.50rem" : "0.85rem",
                  pl: 0
                }}
              >
                Eliminar comentario
              </Button>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default CommentCard
