import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { colors } from '../helpers/colors';
import { Button, Box, Avatar, Typography } from '@mui/material';

const ProfileImageUploader = ({ image, setImage }) => {
  const [preview, setPreview] = useState(null); // Vista previa de la imagen

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file); // Guardar el archivo en el estado (para enviar a Laravel)
      setPreview(URL.createObjectURL(file)); // Crear una URL de vista previa
    }
  }, [setImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

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
          border: `2px solid ${colors.lightGray}`,
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
        {preview ? (
          <Avatar
            src={preview}
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
  );
};

export default ProfileImageUploader;
