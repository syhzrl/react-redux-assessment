import { ForkEffect } from 'redux-saga/effects';

export type SagaWatcherReturnType = Generator<ForkEffect<never>, void, unknown>;
export type SagaForkReturnType = Generator<ForkEffect<void>, void, unknown>;

export interface RootSagaReturnType {
    rootSaga(): Generator<ForkEffect<SagaWatcherReturnType>, void, unknown>;
}
