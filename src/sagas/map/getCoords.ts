import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

import { SagaWatcherReturnType } from '../types';

import Actions from '../../redux/Actions';
import Selectors from '../../redux/Selectors';
import { Location } from '../../entities/map';

export default function* watchGetCoords(): any {
    yield takeEvery('map/getCoordsAttempt', handleGetCoords);
}

function* handleGetCoords(data: PayloadAction<{ address: string, map: google.maps.Map }>): any {
    const { address, map } = data.payload;

    const locationsList = yield select(Selectors.mapGetCoordsList);

    const addressAlreadyExists = locationsList.find((item: Location) => item.address === address);

    if (addressAlreadyExists) {
        yield put(Actions.getCoordsFailure('Address already added'));
        return;
    }

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
