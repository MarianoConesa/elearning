import {
    Box,
    useTheme,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'

const CourseVideo = ({ url, markers = [] }) => {
    const playerRef = useRef(null)
    const [currentTime, setCurrentTime] = useState(0)
    const theme = useTheme()

    // Update el tiempo actual del video cada cierto intervalo
    const handleProgress = (state) => {
        setCurrentTime(state.playedSeconds)
    }

    return (
        <Box>
            {/* Reproductor */}
            <Box
                display="flex"
                justifyContent="center"
                sx={{
                    width: '90vw',              // Ocupa el 90% del viewport horizontal
                    maxWidth: '1100px',         // No crece más allá de 1000px
                    minWidth: '320px',          // No se reduce más de 320px
                    aspectRatio: '16 / 9',      // Mantiene relación 16:9
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: theme.shadows[3],
                    margin: '0 auto',
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
        </Box>
    )
}

export default CourseVideo
