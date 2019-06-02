import initialStore from "./initialStore";
import {IStore} from "../components/types";

export type Action = {
    type: string,
    payload: any
};

function reduce(state: IStore = initialStore, action: Action): IStore {
    switch (action.type) {
        // case 'SET_INITIAL_SETTINGS':
        //     return {
        //         ...state,
        //         ...action.payload
        //     };
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload.data,
                displayData: action.payload.data.length ? action.payload.data.slice(0, state.pageSize) : action.payload.data,
                inProgress: false
            };
        default:
            return state
    }
}

export default reduce;
