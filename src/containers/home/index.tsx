import React, { FunctionComponent, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { CircularProgress } from '@mui/material';
import { InfoRounded } from '@mui/icons-material';

import colours from 'assets/themes/colours';

import config from 'config';

import Input from 'components/Input';
import LocationsList from 'components/LocationsList';
import Map from 'components/Map';

import Modal from 'components/Modal';
import styles from './home-screen.module.css';

const HomeScreen: FunctionComponent = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: config.apiKey || '',
        libraries: config.libraries,
    });

    const [map, setMap] = useState<google.maps.Map | null>((null));

    const [isOpen, setIsOpen] = useState(false);

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
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <h1 className={styles.title}>
                    React Redux Assessment
                </h1>

                <button
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        color: colours.primary,
                        cursor: 'pointer',
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <InfoRounded />
                </button>
            </div>

            {renderMapAndInput()}

            <Modal
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)}
            />
        </div>
    );
};

export default HomeScreen;
