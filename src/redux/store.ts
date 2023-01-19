import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import rootSaga from '../sagas';

import mapReducer from './slices/map';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    map: mapReducer.reducers,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
            ignoredActions: ['map/getCoordsAttempt'],
        },
    }).concat(sagaMiddleware),
    devTools: true,
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
