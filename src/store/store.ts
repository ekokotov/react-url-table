import {IFieldsProp, IHeaderProp, IStore, SortingModes} from "../components/types";
import {createContext} from "react";
import {paginate} from "../helper/pagination";
import HeaderModel from "./header";
import IFieldModel from "./field";

export const RootStore = {
    data: [],

    get displayData() {
        return this.pagination.serverPaging ? this.data :
            paginate(this.data, this.pagination.pageSize, this.pagination.currentPage)
    },

    mergeWithProps(props) {
        Object.assign(this, props);
        this.headers = props.headers.map((header: IHeaderProp, index: number) => new HeaderModel(header, index));
        this.fields = props.fields.map((field: IFieldsProp, index: number) => new IFieldModel(field, index));
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

// pageCount: Math.round(props.data.length / props.pageSize)
