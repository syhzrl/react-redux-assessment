import React, { FunctionComponent } from 'react';

import { connect } from 'react-redux';
import Selectors from '../redux/Selectors';
import { RootState } from '../redux/store';

import { Location } from '../entities/map';
import colours from '../assets/themes/colours';

interface LocationsListProps {
    loading: boolean;
    error: string;
    locationsList: Location[];
    map: google.maps.Map | null;
}

const LocationsList: FunctionComponent<LocationsListProps> = (props: LocationsListProps) => {
    const { map, loading, error, locationsList } = props;

    const renderLocationsList = () => {
        if (locationsList.length === 0) {
            return (
                <p>
                    No locations
                </p>
            );
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                {locationsList.map(item => {
                    const { address } = item;
                    return (
                        <p key={address}>
                            {address}
                        </p>
                    );
                })}
            </div>
        );
    };

    return (
        <div
            style={{
                color: colours.textPrimary,
            }}
        >
            {renderLocationsList()}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    loading: Selectors.mapGetCoordsAttempting(state),
    error: Selectors.mapGetCoordsError(state),
    locationsList: Selectors.mapGetCoordsList(state),
});

export default connect(mapStateToProps)(LocationsList);
