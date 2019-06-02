import {IStore, SortingModes} from "../components/types";

const initialStore: IStore = {
    data: [],
    displayData: [],
    fields: [],
    headers: [],
    pageSize: 10,
    search: 'global',
    sorting: SortingModes.simple,
    inProgress: true,
    uniqProp: 'id'
};

export default initialStore;
