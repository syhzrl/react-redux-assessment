import React, { FunctionComponent, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { CircularProgress } from '@mui/material';

import colours from 'assets/themes/colours';

import config from 'config';

import Input from 'components/Input';
import LocationsList from 'components/LocationsList';
import Map from 'components/Map';

import styles from './home-screen.module.css';

const HomeScreen: FunctionComponent = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: config.apiKey || '',
        libraries: config.libraries,
    });

    const [map, setMap] = useState<google.maps.Map | null>((null));

    const renderMapAndInput = () => {
        if (!isLoaded) {
            return (
                <div className={styles['loader-container']}>
                    <CircularProgress
                        style={{
                            height: '100px',
                            width: '100px',
                            color: colours.secondary,
                        }}
                    />
                </div>
            );
        }

        return (
            <div className={styles['inner-container']}>
                <div className={styles['input-container']}>
                    <Input map={map} />

                    <LocationsList map={map} />
                </div>

                <Map
                    setMap={setMap}
                />
            </div>
        );
    };

    return (
        <div className={styles['main-container']}>
            <h1 className={styles.title}>
                React Redux Assessment
            </h1>

            {renderMapAndInput()}
        </div>
    );
};

export default HomeScreen;
