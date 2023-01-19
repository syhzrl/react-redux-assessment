import { fork } from 'redux-saga/effects';

import { RootSagaReturnType } from '../types';

import watchGetCoords from './getCoords';

export default (): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetCoords);
    }

    return {
        rootSaga,
    };
};
