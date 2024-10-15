import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { colors } from '../helpers/colors'
import { Button, Box, Avatar, Typography } from '@mui/material'

const ProfileImageUploader = ({image, setImage}) => {

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          border: `2px solid ${colors.lightGray}` ,
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '50%',
          width: '15dvh',
          height: '15dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <input {...getInputProps()} />
        {image ? (
          <Avatar
            src={image}
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        ) : (
          <Typography>
            {isDragActive ? 'Soltar imagen aquí...' : 'Haz click o arrastra para seleccionar una foto de perfil'}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default ProfileImageUploader
