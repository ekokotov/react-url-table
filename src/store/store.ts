import {IFieldsProp, IHeaderProp, IStore, SortingModes} from "../components/types";
import {createContext} from "react";
import {paginate} from "../helper/pagination";
import HeaderModel from "./header";
import IFieldModel from "./field";
import {load} from "../helper/http";

export const RootStore = {
    data: [],
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

    get displayData() {
        if (this.pagination.pageCount > 1) {
            return this.pagination.serverPaging ? this.data :
                paginate(this.data, this.pagination.pageSize, this.pagination.currentPage)
        }
        return this.data;
    },

    mergeWithProps(props) {
        this.inProgress = true;
        if (props.headers) {
            this.headers = props.headers.map((header: IHeaderProp, index: number) => new HeaderModel(header, index));
        }
        this.fields = props.fields.map((field: IFieldsProp, index: number) => new IFieldModel(field, index));
        this.uniqProp = props.uniqProp;
        this.url = props.url;

        if (props.data && props.data.length) {
            this.data = props.data;
            this.inProgress = false;
        }

        if (this.url) {
            this._loadByUrl(props);
        } else {
            this._initPagination(props)
        }
    },

    async _loadByUrl(props) {
        try {
            const res: object = await load(this.url);
            this.inProgress = false;
            this.data = props.fetchSuccess ? props.fetchSuccess(res) : res;
            this._initPagination(props);
        } catch (e) {
            console.error(e);
        }
    },

    _initPagination(props) {
        if (!props.pagination) {
            this.pagination.show = false
        } else if (props.pagination) {
            Object.assign(this.pagination, props.pagination);
            if (this.data.length && !this.pagination.serverPaging && !props.pagination.pageCount) {
                this.pagination.pageCount = Math.round(this.data.length / this.pagination.pageSize);
            }
        }
    }

} as IStore;

window["__store"] = RootStore;
export const TableContext = createContext(null);
