import { Box, Avatar, Typography, Button, Stack } from "@mui/material"
import dayjs from "dayjs"
import "dayjs/locale/es"
import { useThemeContext } from "../../context/ThemeContext"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@emotion/react"

dayjs.locale("es")

const CommentCard = ({ comment, currentUserId, onDelete, isAdmin }) => {

  const theme = useTheme()
  const colors = { ...theme.palette }

  const isOwner = isAdmin || currentUserId === comment.user?.id
  const formattedDate = dayjs(comment.created_at).format("D [de] MMM [de] YYYY, HH:mm")
  const { isSmallScreen } = useThemeContext()

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 1,
        p: 1.5,
        mb: 1.5,
      }}
    >
      <Stack direction="row" spacing={1.5}>
        <Avatar
          src={comment.user?.profilePic}
          sx={{ width: isSmallScreen ? 28 : 32, height: isSmallScreen ? 28 : 32, cursor: 'pointer' }}
          onClick={() => {navigate(`${import.meta.env.VITE_APP_FOREIGN_PROFILE}${comment.user.id}`)}}
        />
        <Box flex={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight="bold" color="text.primary">
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
