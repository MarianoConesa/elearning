import { Button, Grid, Box, CircularProgress, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState } from 'react';
import ProfileImageUploader from '../../components/ProfileImageUploader';
import LeftMenu from '../../components/leftMenu/LeftMenu';

const Home = ({ data, userData, loader, userLoader, update, categories, catLoader }) => {
    const images = [
        'https://via.placeholder.com/800x400.png?text=Image+1',
        'https://via.placeholder.com/800x400.png?text=Image+2',
        'https://via.placeholder.com/800x400.png?text=Image+3'
    ];

    return (
        <Grid container sx={{marginTop: `5px`}}>
            <Header {...{ data, userData, loader, userLoader, update }} />
            
            <Grid item xs={12} sx={{height: `90dvh`, overflow: `auto`}}>
                    
            </Grid>
            {/* <Grid item xs={2} sx={{height: `90dvh`, overflow: `auto`}}>
                {!catLoader ? <LeftMenu {...{categories}}/> : <LinearProgress/>}
            </Grid>
            <Grid item xs={10}>
                {data && !userData ? <Carousel
                    navButtonsAlwaysVisible={false}
                    indicatorContainerProps={{
                        style: {
                            marginTop: '10px', // Adjust to position the navigation menu below the carousel
                        }
                    }}
                >
                    {images.map((image, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                        </Box>
                    ))}
                </Carousel> : loader && <CircularProgress/>}
            </Grid> */}
        </Grid>
    );
};

Home.propTypes = {
    data: PropTypes.array,
    userData: PropTypes.object,
    loader: PropTypes.bool,
    userLoader: PropTypes.bool
};

export default Home;
