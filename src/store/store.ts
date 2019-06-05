import {IStore, SortingModes} from "../components/types";
import {createContext} from "react";
import {paginate} from "../helper/pagination";

export const RootStore = {
    data: [],

    get displayData() {
        return this.pagination.serverPaging ? this.data :
            paginate(this.data, this.pagination.pageSize, this.pagination.currentPage)
    },

    mergeWithProps(props) {
        Object.assign(this, props)
    },

    renderHeader(data) {
        if (typeof data === 'string') {
            return data;
        }
        return data.render ? data.render(data.name) : data.name;
    },

    renderField(field, record) {
        if (typeof field === 'string') {
            return record[field];
        } else if (field.render) {
            return field.render(record[field.name]);
        }
        return record[field.name];
    },

    getHeaderOrFieldValue(header) {
        if (typeof header === 'string') {
            return header;
        }
        return header.name;
    },

    fields: [],
    headers: [],
    search: 'global',
    sorting: SortingModes.simple,
    inProgress: true,
    uniqProp: 'id',
    pagination: {
        serverPaging: false,
        pageSize: 10,
        currentPage: 0,
        pageCount: 1,
        pageRangeDisplayed: 5,
        marginPagesDisplayed: 1
    }
} as IStore;

export const TableContext = createContext(null);

// export function initializeStore(props: ITableProps): IStore {
//     return {
//         ...initialStore,
//         ...props,
//         ...(!props.url && { // just pass raw data to display
//             displayData: ,
//             inProgress: false
//         }),
//         ...{
//             pagination: {
//                 ...initialStore.pagination,
//                 ...props.pagination,
//                 ...(props.data && (props.pagination && !props.pagination.pageCount) && {
//                     pageCount: Math.round(props.data.length / props.pageSize)
//                 })
//             }
//         }
//     };
// }
