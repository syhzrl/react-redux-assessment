import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@mui/material';
import { DeleteSharp } from '@mui/icons-material';

import { connect } from 'react-redux';
import Selectors from '../redux/Selectors';
import { RootState, AppDispatch } from '../redux/store';

import { Location } from '../entities/map';
import colours from '../assets/themes/colours';

import styles from './locations-list.module.css';
import Actions from '../redux/Actions';

interface LocationsListProps {
    loading: boolean;
    error: string;
    locationsList: Location[];
    map: google.maps.Map | null;
    deleteCoords: (address: string) => void;
}

const LocationsList: FunctionComponent<LocationsListProps> = (props: LocationsListProps) => {
    const { map, loading, error, locationsList, deleteCoords } = props;

    const renderLocationsList = () => {
        if (locationsList.length === 0) {
            return (
                <p>
                    No locations selected.
                </p>
            );
        }

        return (
            <div className={styles['list-container']}>
                {locationsList.map(item => {
                    const { address, lat, lng } = item;
                    return (
                        <div
                            key={address}
                            className={styles['list-buttons-container']}
                        >
                            <button
                                className={styles['address-button']}
                                onClick={() => {
                                    if (map) map.panTo({ lat, lng });
                                }}
                            >
                                {address}
                            </button>

                            <button
                                className={styles['delete-button']}
                                onClick={() => deleteCoords(address)}
                            >
                                <DeleteSharp />
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderLoaderOrError = () => {
        if (loading) {
            return (
                <CircularProgress
                    style={{
                        height: '100%',
                        color: colours.secondary,
                    }}
                />
            );
        }

        if (error) {
            return (
                <p style={{ color: colours.error }}>
                    {error}
                </p>
            );
        }

        return null;
    };

    return (
        <div className={styles['main-container']}>
            <div className={styles['title-container']}>
                <h2 className={styles.title}>
                    Search Results
                </h2>

                {renderLoaderOrError()}
            </div>

            {renderLocationsList()}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    loading: Selectors.mapGetCoordsAttempting(state),
    error: Selectors.mapGetCoordsError(state),
    locationsList: Selectors.mapGetCoordsList(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    deleteCoords: (address: string) => dispatch(Actions.deleteCoords(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationsList);
