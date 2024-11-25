import { Button, Grid, Box, CircularProgress, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
//import Carousel from 'react-material-ui-carousel';
import Carousel from '../../components/Carousel';
import { useEffect, useState } from 'react';
import ProfileImageUploader from '../../components/ProfileImageUploader';
import LeftMenu from '../../components/leftMenu/LeftMenu';

const Home = ({ data, userData, loader, userLoader, update, categories, catLoader }) => {
    const images = [
        {url: 'https://picsum.photos/1000',text: "patata patata patata patata patata patata" , textColor: 'red'},
        {url: 'https://picsum.photos/500',text: "patata2", textColor: 'green'},
        {url: 'https://picsum.photos/2000',text: "patata3", textColor: 'blue'}
    ];

    return (
        <Grid container sx={{marginTop: `5px`}}>
            <Header {...{ data, userData, loader, userLoader, update }} />
            
            <Grid item xs={12} sx={{height: `90dvh`, overflow: `auto`}}>
            {/* <Carousel images={images} height='700px'></Carousel> */}
                    
            </Grid>
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
