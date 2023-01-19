import { fork } from 'redux-saga/effects';

import { SagaForkReturnType } from './types';

import map from './map';

export default function* root(): SagaForkReturnType {
    yield fork(map().rootSaga);
}
