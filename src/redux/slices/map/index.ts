import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from 'entities/map';
import { MapReduxState } from './types';

const initialState: MapReduxState = {
    actions: {
        getCoords: false,
    },
    locations: [],
    error: {
        getCoords: '',
    },
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        getCoordsAttempt: (state, _action: PayloadAction<{ address: string, map: google.maps.Map }>) => {
            state.actions.getCoords = true;
            state.error.getCoords = '';
        },
        getCoordsSuccess: (state, action: PayloadAction<Location>) => {
            state.actions.getCoords = false;
            state.error.getCoords = '';

            if (action.payload) {
                state.locations.push(action.payload);
            }
        },
        getCoordsFailure: (state, action: PayloadAction<string>) => {
            state.actions.getCoords = false;
            if (action.payload) {
                state.error.getCoords = action.payload;
            }
        },
        deleteCoords: (state, action: PayloadAction<string>) => {
            state.locations = state.locations.filter(item => item.address !== action.payload);
        },
    },
});

export type MapState = typeof initialState;

export default {
    actions: mapSlice.actions,
    reducers: mapSlice.reducer,
};
