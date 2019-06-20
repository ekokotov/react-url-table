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

    return useLocalStore(() => <IStore>({
        props: observableProps,
        _data: undefined,
        inProgress: false,
        currentPage: 0,
        selectedItems: {},
        sorting: {},
        error: undefined,
        searchQuery: '',

        search(query: string) {
            this.searchQuery = query;
            this.currentPage = 0;
        },

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
            return this.props.loading || this.inProgress && !this.error
        },

        sort(header) {
            if (this.isLoading || (this.props.pagination && this.props.pagination.serverPaging)) {
                return;
            }
            const property = this.fields[header.index].property;
            const headerName = header.name;

            if (this.sorting[property]) {
                this.sorting[property].order = this.sorting[property].order === SortingValues.ASC ? SortingValues.DESC
                    : SortingValues.ASC;
            } else if (this.props.sorting === SortingModes.simple) {
                this.sorting = {
                    [property]: {
                        headerName,
                        order: SortingValues.ASC
                    }
                };
            } else {
                this.sorting[property] = {
                    headerName,
                    order: SortingValues.ASC
                };
            }
            this.currentPage = 0;
        },

        removeFromSorting(property) {
            delete this.sorting[property];
            this.currentPage = 0;
        },

        get pageCount() {
            if (!this.props.pagination) {
                return 1;
            }
            return this.props.pagination.pageCount ||
                this.props.pagination.pageSize && Math.round(this.filteredAndSortedData.length / this.props.pagination.pageSize) || 1;
        },

        get displayData() {
            if (this.pageCount > 1 && this.props.pagination) {

                if (!this.props.pagination.serverPaging && this.props.pagination.pageSize) {
                    return paginate(this.filteredAndSortedData, this.props.pagination.pageSize, this.currentPage)
                }
                // else {
                //     filteredData = <any[]>this.props.data;
                // }
            }

            return this.filteredAndSortedData;
        },

        get filteredAndSortedData() {
            let filteredData = this.data;

            if (this.searchQuery.length) {
                filteredData = filteredData.filter(row =>
                    this.fields.some(field =>
                        row[field.property].toString().indexOf(this.searchQuery) !== -1
                    ));
            }

            if (Object.keys(this.sorting).length) {
                return _orderBy(filteredData, Object.keys(this.sorting), Object.values(this.sorting).map(v => v.order));
            }

            return filteredData;
        },

        get headers() {
            return this.props.headers && this.props.headers.map((header: IHeaderProp, index: number) => new HeaderModel(header, index))
        },

        get fields() {
            return this.props.fields.map((field: IFieldsProp, index: number) => new IFieldModel(field, index));
        },

        get data() {
            return this._data || this.props.data;
        },

        async loadByUrl() {
            if (!this.props.url) {
                return
            }

            this.inProgress = true;

            try {
                const res = await load(this.props.url);
                this.inProgress = false;
                this._data = <any[]>(this.props.fetchSuccess ? this.props.fetchSuccess(res) : res);
            } catch (e) {
                this.error = e.message;
                console.error(e);
            }
        },
    }));
}
