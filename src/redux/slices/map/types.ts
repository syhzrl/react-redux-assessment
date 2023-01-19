import { Location } from '../../../entities/map';

export interface MapReduxState {
    actions: {
        getCoords: boolean;
    },
    locations: Location[];
    error: {
        getCoords: string;
    },
}
