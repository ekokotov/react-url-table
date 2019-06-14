import {
    IFieldsProp,
    IHeaderProp,
    IStore,
    ITableProps,
    SelectModes,
    SortingModes,
    SortingValues
} from "../@typings/types";
import {paginate} from "../helper/pagination";
import HeaderModel from "./header";
import IFieldModel from "./field";
import {load} from "../helper/http";
import _orderBy from 'lodash/orderBy';
import {useAsObservableSource, useLocalStore} from 'mobx-react';

export function useRootStore(props: ITableProps): IStore {
    const observableProps = useAsObservableSource<ITableProps>(props);

    return useLocalStore<IStore>(() => ({
        props: observableProps,
        _data: undefined,
        inProgress: false,
        currentPage: 0,
        selectedItems: {},
        sorting: {},

        select(row) {
            if (this.props.selectMode) {
                const uniqPropValue = row[this.props.uniqProp];

                if (!this.selectedItems.hasOwnProperty(uniqPropValue)) {
                    if (this.props.selectMode === SelectModes.single) {
                        this.selectedItems = {};
                    }
                    this.selectedItems[uniqPropValue] = row;
                } else {
                    delete this.selectedItems[uniqPropValue];
                }

                if (this.props.onSelect) {
                    this.props.onSelect(Object.values(this.selectedItems));
                }
            }
        },

        get isLoading() {
            return this.props.loading || this.inProgress
        },

        sort(header) {
            if (this.isLoading || this.props.pagination.serverPaging) {
                return;
            }
            const property = this.fields[header.index].property;

            if (this.sorting[property]) {
                this.sorting[property] = this.sorting[property] === SortingValues.ASC ? SortingValues.DESC
                    : SortingValues.ASC;
            } else if (this.props.sorting === SortingModes.simple) {
                this.sorting = {
                    [property]: SortingValues.ASC
                };
            } else {
                this.sorting[property] = SortingValues.ASC;
            }
            this.currentPage = 0;
        },

        get displayData() {
            const pageCount = this.props.pagination.pageCount ||
                Math.round(this.sortedData.length / this.props.pagination.pageSize);

            if (pageCount > 1) {
                return this.props.pagination.serverPaging ? this.props.data :
                    paginate(this.sortedData, this.props.pagination.pageSize, this.currentPage)
            }
            return this.sortedData;
        },

        get sortedData() {
            if (Object.keys(this.sorting).length) {
                return _orderBy(this.data, Object.keys(this.sorting), Object.values(this.sorting));
            }
            return this.data;
        },

        get headers() {
            return this.props.headers.map((header: IHeaderProp, index: number) => new HeaderModel(header, index))
        },

        get fields() {
            return this.props.fields.map((field: IFieldsProp, index: number) => new IFieldModel(field, index));
        },

        get data() {
            return this._data || this.props.data;
        },

        get pageCount() {
            return this.props.pagination.pageCount || this.props.pagination &&
                this.data && Math.round(this.data.length / this.props.pagination.pageSize);
        },

        async loadByUrl() {
            this.inProgress = true;
            try {
                const res = await load(this.props.url);
                this.inProgress = false;
                this._data = this.props.fetchSuccess ? this.props.fetchSuccess(res) : res;
            } catch (e) {
                console.error(e);
            }
        },

    }));
}
