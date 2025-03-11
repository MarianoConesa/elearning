import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material'

// Formatea segundos a mm:ss
const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const CourseVideo = ({ url, markers = [] }) => {
    const playerRef = useRef(null)
    const [currentTime, setCurrentTime] = useState(0)
    const theme = useTheme()

    // Update el tiempo actual del video cada cierto intervalo
    const handleProgress = (state) => {
        setCurrentTime(state.playedSeconds)
    }

    const handleSeek = (seconds) => {
        if (playerRef.current) {
            playerRef.current.seekTo(seconds, 'seconds')
        }
    }

    // Determina qué marcador está activo en función del tiempo actual
    const getActiveMarkerIndex = () => {
        let index = -1
        for (let i = 0; i < markers.length; i++) {
            if (currentTime >= markers[i].time) {
                index = i
            }
        }
        return index
    }

    const activeIndex = getActiveMarkerIndex()

    return (
        <Box>
            {/* Reproductor */}
            <Box
                display="flex"
                justifyContent="center"
                sx={{
                    width: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: theme.shadows[3],
                }}
            >
                <ReactPlayer
                    ref={playerRef}
                    url={url}
                    controls
                    width="100%"
                    height="100%"
                    onProgress={handleProgress}
                />
            </Box>

            {/* Lista de marcadores */}
            {markers.length > 0 && (
                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        Marcadores del video
                    </Typography>
                    <List>
                        {markers.map((marker, index) => (
                            <ListItem
                                key={index}
                                button
                                onClick={() => handleSeek(marker.time)}
                                selected={index === activeIndex}
                                sx={{
                                    borderRadius: 1,
                                    backgroundColor:
                                        index === activeIndex
                                            ? theme.palette.action.selected
                                            : 'transparent',
                                }}
                            >
                                <ListItemText
                                    primary={marker.label}
                                    secondary={formatTime(marker.time)}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    )
}

export default CourseVideo
