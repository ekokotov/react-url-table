import {IFieldsProp, IHeaderProp, IStore, ITableProps, SelectModes} from "../components/types";
import {paginate} from "../helper/pagination";
import HeaderModel from "./header";
import IFieldModel from "./field";
import {load} from "../helper/http";
import {useLocalStore, useAsObservableSource} from 'mobx-react';

export function useRootStore(props: ITableProps): IStore {
    const observableProps: ITableProps = useAsObservableSource(props);

    return useLocalStore((): IStore => ({
        props: observableProps,
        _data: undefined,
        inProgress: false,
        currentPage: 0,
        selectedItems: {},

        select(row) {
            if (this.props.selectMode) {
                const uniqPropValue = row[this.props.uniqProp];

                if (!this.selectedItems.hasOwnProperty(uniqPropValue)) {
                    if (this.props.selectMode === SelectModes.single) {
                        this.selectedItems = {};
                    }
                    this.selectedItems[uniqPropValue] = row;
                } else {
                    // const {[uniqPropValue]: _, ...result} = this.selectedItems;
                    // this.selectedItems = result;
                    delete this.selectedItems[uniqPropValue];
                }

                if (this.props.onSelect) {
                    this.props.onSelect(Object.values(this.selectedItems));
                }
            }
        },

        get displayData() {
            const pageCount = this.props.pagination.pageCount || Math.round(this.data.length / this.props.pagination.pageSize);

            if (pageCount > 1) {
                return this.props.pagination.serverPaging ? this.props.data :
                    paginate(this.data, this.props.pagination.pageSize, this.currentPage)
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
            return this.props.pagination.pageCount || this.props.pagination && this.data && Math.round(this.data.length / this.props.pagination.pageSize);
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
