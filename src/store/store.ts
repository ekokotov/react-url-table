import {IFieldsProp, IHeaderProp, IStore, SortingModes} from "../components/types";
import {createContext} from "react";
import {paginate} from "../helper/pagination";
import HeaderModel from "./header";
import IFieldModel from "./field";

export const RootStore = {
    data: [],

    get displayData() {
        if (this.pagination.pageCount > 1) {
            return this.pagination.serverPaging ? this.data :
                paginate(this.data, this.pagination.pageSize, this.pagination.currentPage)
        }
        return this.data;
    },

    get showPaging() {
        return this.pagination.pageCount > 1 && this.pagination.show
    },

    fields: [],
    headers: [],
    search: 'global',
    sorting: SortingModes.simple,
    inProgress: true,
    uniqProp: 'id',
    pagination: {
        show: true,
        serverPaging: false,
        pageSize: 10,
        currentPage: 0,
        pageCount: 1,
        pageRangeDisplayed: 5,
        marginPagesDisplayed: 1
    },

    mergeWithProps(props) {
        if (props.headers) {
            this.headers = props.headers.map((header: IHeaderProp, index: number) => new HeaderModel(header, index));
        }
        this.fields = props.fields.map((field: IFieldsProp, index: number) => new IFieldModel(field, index));
        this.uniqProp = props.uniqProp;

        if (props.data && props.data.length) {
            this.data = props.data;
            this.inProgress = false;
        }

        if (typeof props.pagination === 'boolean' && props.pagination === false) {
            this.pagination.show = false
        } else if (props.pagination) {
            Object.assign(this.pagination, props.pagination);
            if (this.data.length && !this.pagination.serverPaging && !props.pagination.pageCount) {
                this.pagination.pageCount = Math.round(this.data.length / this.pagination.pageSize);
            }
        }
    },

} as IStore;

export const TableContext = createContext(null);
