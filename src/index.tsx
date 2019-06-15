import React, {PureComponent} from 'react';
import _merge from 'lodash/merge';
import Thead from './components/thead';
import Tbody from './components/tbody';
import Table from "./components/table";
import {ITableProps, SortingModes} from "./@typings/types";
import Pagination from "./components/pagination";
import {StoreProvider} from "./store/context";
import SortingPanel from "./components/sorting-panel";

class UrlTable extends PureComponent<ITableProps> {
    state = {} as ITableProps;

    static getDerivedStateFromProps(nextProps: ITableProps): ITableProps {
        return _merge({
            data: [],
            fields: [],
            headers: [],
            loading: false,
            uniqProp: 'id',
            selectMode: false,
            onSelect: undefined,
            pagination: {
                serverPaging: false,
                pageSize: 10,
                pageRangeDisplayed: 5,
                marginPagesDisplayed: 1
            },
            search: 'global',
            sorting: SortingModes.simple,
            showSortingPanel: true,
        }, nextProps);
    }

    render() {
        return <StoreProvider {...this.state}>
            {this.state.sorting && this.state.showSortingPanel && <SortingPanel/>}
            <Table>
                <Thead/>
                <Tbody/>
            </Table>
            <Pagination/>
        </StoreProvider>
    }
}

export default UrlTable;
