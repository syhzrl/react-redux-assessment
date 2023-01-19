import React, { FunctionComponent, useState } from 'react';
import { useLoadScript, LoadScriptProps } from '@react-google-maps/api';
import { CircularProgress } from '@mui/material';

import colours from '../assets/themes/colours';

import Input from '../components/Input';
import LocationsList from '../components/LocationsList';
import Map from '../components/Map';

const libraries: LoadScriptProps['libraries'] = ['places'];

const HomeScreen: FunctionComponent = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [map, setMap] = useState<google.maps.Map | null>((null));

    const renderMapAndInput = () => {
        if (!isLoaded) {
            return (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        gap: '20px',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
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
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    gap: '20px',
                    flex: 1,
                }}
            >
                <div
                    style={{
                        width: '50%',
                        padding: '20px',
                        display: 'flex',
                        gap: '20px',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Input map={map} />

                    <h2
                        style={{
                            color: '#b4befe',
                        }}
                    >
                        Search Results
                    </h2>

                    <LocationsList map={map} />
                </div>

                <Map
                    setMap={setMap}
                />
            </div>
        );
    };

    return (
        <div
            style={{
                width: '100vw',
                backgroundColor: '#1e1e2e',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                flexDirection: 'column',
                gap: '20px',
            }}
        >
            <h1
                style={{
                    color: '#b4befe',
                }}
            >
                React Redux Assessment
            </h1>

            {renderMapAndInput()}
        </div>
    );
};

export default HomeScreen;
