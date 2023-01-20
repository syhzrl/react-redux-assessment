import { LoadScriptProps } from '@react-google-maps/api';

const libraries: LoadScriptProps['libraries'] = ['places'];

const config = {
    libraries,
};

export default config;
