import {IStore} from "../components/types";
import {paginate} from "../helper/pagination";

export type Action = {
    type: string,
    payload?: any
};

function reduce(state: IStore, action: Action): IStore {
    switch (action.type) {
        case 'SET_DATA_FROM_URL':
            return {
                ...state,
                data: action.payload.data,
                displayData: action.payload.data,
                inProgress: false
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload.page,
                displayData: paginate(state.data, state.pageSize, action.payload.page),
            };
        default:
            return state
    }
}

export default reduce;
