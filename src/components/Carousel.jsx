import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';


const Carousel = ({ images, height = '500px' }) => {
  const settings = {
    dots: true,
    nextArrow: <ArrowCircleRight/>,
    prevArrow: <ArrowCircleLeft/>,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <Grid
      sx={{
        paddingLeft: '10%',
        paddingRight: '10%',
        position: 'relative',
        '&:hover .slick-arrow': {
          display: 'block', // Mostrar flechas al hacer hover
          color: 'black'
        },
      }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              height, // Altura pasada al componente
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Typography
              variant="h4"
              color={image.textColor || 'white'} // Color del texto personalizado o valor predeterminado
              sx={{
                position: 'absolute',
                textAlign: 'center',
                width: '100%',
                paddingX: 2,
              }}
            >
              {image.text}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Grid>
  )
}

export default Carousel;
