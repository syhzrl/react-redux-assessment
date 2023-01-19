import React, { FunctionComponent } from 'react';
import { useLoadScript, GoogleMap, LoadScriptProps } from '@react-google-maps/api';

import Input from '../components/Input';

const libraries: LoadScriptProps['libraries'] = ['places'];

const HomeScreen: FunctionComponent = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (!isLoaded) {
        return (
            <p>
                Loading...
            </p>
        );
    }

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
                        // backgroundColor: 'red',
                        padding: '20px',
                        display: 'flex',
                        gap: '20px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Input />

                    <h2
                        style={{
                            color: '#b4befe',
                        }}
                    >
                        Search Results
                    </h2>
                </div>

                <GoogleMap
                    zoom={15}
                    center={{ lat: 3.15, lng: 101.71 }}
                    mapContainerStyle={{
                        width: '50%',
                        backgroundColor: 'transparent',
                        borderRadius: '10px',
                    }}
                />
            </div>
        </div>
    );
};

export default HomeScreen;
