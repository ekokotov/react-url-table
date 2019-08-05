import _orderBy from 'lodash/orderBy';
import {toJS} from "mobx";
import {useAsObservableSource, useLocalStore} from 'mobx-react';
import {load} from "../helper/http";

import {
    IFieldsProp,
    IHeaderProp, IRecord,
    IStore,
    ITableProps,
    SelectModes,
    SortingModes,
    SortingValues
} from "../@typings/types";
import {calculatePageCount, paginate} from "../helper/pagination";
import IFieldModel from "./models/field";
import HeaderModel, {IHeaderModel} from "./models/header";

export function useRootStore(props: ITableProps): IStore {
    const observableProps = useAsObservableSource<ITableProps>(props);

    return useLocalStore(() => ({
        props: observableProps,
        inProgress: false,
        _loadedData: undefined,
        currentPage: 0,
        selectedItems: {},
        sorting: {},
        error: undefined,
        searchQuery: '',

        filterHandlers() {
            return [
                this.searchFilter,
                this.sortFilter
            ]
        },

        searchFilter(data) {
            if (this.searchQuery.length) {
                data = data.filter((row: IRecord) => this.fields.some((field: IFieldModel) => {
                        const searchable = this.headers && this.headers[field.index].searchable;

                        return searchable && row[field.property].toString().toLowerCase()
                            .indexOf(this.searchQuery.toLowerCase()) !== -1
                    }
                ));
            }
            return data;
        },

        sortFilter(data) {
            if (Object.keys(this.sorting).length) {
                return _orderBy(data, Object.keys(this.sorting), Object.values(this.sorting).map(v => v.order));
            }
            return data;
        },

        paginateFilter(data) {
            let _data = data;

            if (this.props.pagination && _data.length > this.props.pagination.pageSize && this.props.pagination.pageSize) {
                _data = paginate<IRecord>(data, this.props.pagination.pageSize, this.currentPage)
            }

            return {data: _data, pageCount: calculatePageCount(data, this.props.pagination)};
        },

        search(query: string) {
            this.searchQuery = query;
            this.currentPage = 0;
        },

        select(row) {
            if (this.props.selectMode) {
                const indexFieldValue = row[this.props.indexField];

                if (!this.selectedItems.hasOwnProperty(indexFieldValue)) {
                    if (this.props.selectMode === SelectModes.single) {
                        this.selectedItems = {};
                    }
                    this.selectedItems[indexFieldValue] = row;
                } else {
                    delete this.selectedItems[indexFieldValue];
                }

                if (this.props.onSelect) {
                    this.props.onSelect(Object.values(this.selectedItems));
                }
            }
        },

        get isLoading() {
            return this.inProgress && !this.error
        },

        sort(header) {
            if (this.isLoading) {
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

        editCell(newValue, record, model) {
            if (record[model.property].toString() === newValue) { // check if new value the same
                return;
            }
            record[model.property] = newValue;
            if (this.props.onEdit) {
                this.props.onEdit(newValue, model.property, toJS(record));
            }
        },

        isEditableField(field) {
            if (this.headers && this.headers.length) {
                const header: IHeaderModel = this.headers[field.index];
                if ((header.editable || this.props.editable) && field.renderHandler) {
                    console.warn(`Please avoid to use editable mode with custom render method for property: ${field.property}`)
                }
                if (typeof header.editable !== "undefined") {
                    return header.editable;
                }
            }
            return this.props.editable;
        },

        get displayData() {
            const filteredData = this.filterHandlers().reduce((f, g) => args => g(f(args)))(
                this._loadedData || this.props.data as IRecord[]
            );
            return this.paginateFilter(filteredData);
        },

        get headers() {
            return this.props.headers && this.props.headers.map((header: IHeaderProp, index: number) => new HeaderModel(header, index))
        },

        get fields() {
            return this.props.fields.map((field: IFieldsProp, index: number) => new IFieldModel(field, index));
        },

        async loadByUrl() {
            if (!this.props.url) {
                return
            }

            this.inProgress = true;

            try {
                const res = await load(this.props.url);
                this.inProgress = false;
                this._loadedData = (this.props.fetchSuccess ? this.props.fetchSuccess(res) : res) as IRecord[];
            } catch (e) {
                this.error = e.message;
                console.error(e);
            }
        },
    } as IStore));
}
