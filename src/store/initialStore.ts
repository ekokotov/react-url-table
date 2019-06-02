import {IStore, ITableProps, SortingModes} from "../components/types";
import {paginate} from "../helper/pagination";

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

export function initializeStore(props: ITableProps): IStore {
    return {
        ...initialStore,
        ...props,
        ...(!props.url && { // just pass raw data to display
            displayData: paginate(props.data, props.pageSize, initialStore.currentPage),
            inProgress: false
        }),
        ...{
            pagination: {
                ...initialStore.pagination,
                ...props.pagination,
                ...(props.data && (props.pagination && !props.pagination.pageCount) && {
                    pageCount: Math.round(props.data.length / props.pageSize)
                })
            }
        }
    };
}
