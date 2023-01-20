import { LoadScriptProps } from '@react-google-maps/api';

const libraries: LoadScriptProps['libraries'] = ['places'];

const config = {
    libraries,
    apiKey: 'AIzaSyBCnY_8Ns_0wm1mZbICcYGqYoSE9ykYfjY',
    // apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
};

export default config;
