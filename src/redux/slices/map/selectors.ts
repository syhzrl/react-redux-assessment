import { MapState } from '.';
import { Location } from '../../../entities/map';

const getCoordsAttempting = (state: MapState): boolean => state.actions.getCoords || false;
const getCoordsError = (state: MapState): string => state.error.getCoords || '';

const getCoordsList = (state: MapState): Location[] => state.locations || [];

export default {
    getCoordsAttempting,
    getCoordsError,

    getCoordsList,
};
