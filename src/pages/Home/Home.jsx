import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
//import Carousel from 'react-material-ui-carousel';

const Home = (props) => {
    const images = [
        {url: 'https://picsum.photos/1000',text: "patata patata patata patata patata patata" , textColor: 'red'},
        {url: 'https://picsum.photos/500',text: "patata2", textColor: 'green'},
        {url: 'https://picsum.photos/2000',text: "patata3", textColor: 'blue'}
    ];

    return (
        <Grid container>
            <Grid item xs={12} sx={{minHeight: `81dvh`, overflow: `auto`}}>
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
