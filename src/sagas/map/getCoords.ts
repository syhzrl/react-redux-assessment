import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

import { SagaWatcherReturnType } from '../types';

import Actions from '../../redux/Actions';

export default function* watchGetCoords(): SagaWatcherReturnType {
    yield takeEvery('map/getCoordsAttempt', handleGetCoords);
}

function* handleGetCoords(data: PayloadAction<{ address: string, map: google.maps.Map }>): any {
    const { address, map } = data.payload;

    const geocode = yield call(() => getGeocode({ address }));
    const { lat, lng } = yield call(() => getLatLng(geocode[0]));

    if (geocode || lat || lng) {
        yield put(Actions.getCoordsSuccess({
            address,
            lat,
            lng,
        }));
        map.panTo({ lat, lng });
    } else {
        yield put(Actions.getCoordsFailure('Sorry something went wrong!'));
    }
}
