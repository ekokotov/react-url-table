import {IStore, SortingModes} from "../components/types";

const initialStore: IStore = {
    data: [],
    displayData: [],
    fields: [],
    headers: [],
    pageSize: 10,
    currentPage: 0,
    search: 'global',
    sorting: SortingModes.simple,
    inProgress: true,
    uniqProp: 'id',
    pagination: {
        pageCount: 1,
        pageRangeDisplayed: 5,
        marginPagesDisplayed: 1
    }
};

export default initialStore;
