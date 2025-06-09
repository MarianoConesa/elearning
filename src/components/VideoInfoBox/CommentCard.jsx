import { Box, Avatar, Typography, Button, Stack } from "@mui/material"
import dayjs from "dayjs"
import "dayjs/locale/es"
import { useThemeContext } from "../../context/ThemeContext"

dayjs.locale("es")

const CommentCard = ({ comment, currentUserId, onDelete }) => {
  const isOwner = currentUserId === comment.user?.id
  const formattedDate = dayjs(comment.created_at).format("D [de] MMM [de] YYYY, HH:mm")
  const { isSmallScreen } = useThemeContext()

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 1,
        p: 1.5,
        mb: 1.5,
        backgroundColor: "#f9f9f9"
      }}
    >
      <Stack direction="row" spacing={1.5}>
        <Avatar
          src={comment.user?.profilePic}
          sx={{ width: isSmallScreen ? 28 : 32, height: isSmallScreen ? 28 : 32 }}
        />
        <Box flex={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight="bold">
              {comment.user?.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5  }}>
            {comment.content}
          </Typography>

          {isOwner && (
            <Box mt={1}>
              <Button
                onClick={() => onDelete(comment)}
                variant="text"
                sx={{
                  textTransform: "none",
                  color: theme => theme.palette.error.main,
                  fontSize: "0.8rem",
                  px: 0,
                  minWidth: 0
                }}
              >
                Eliminar
              </Button>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default CommentCard
