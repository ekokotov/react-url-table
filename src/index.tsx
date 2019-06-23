import React, {PureComponent} from 'react';
import _merge from 'lodash/merge';
import Thead from './components/head/thead';
import Tbody from './components/body/tbody';
import Table from "./components/table";
import {ITableProps, SortingModes} from "./@typings/types";
import Pagination from "./components/pagination";
import {StoreProvider} from "./store/context";
import SortingPanel from "./components/controls-panel/sorting";
import SearchInput from "./components/controls-panel/searchInput";
import ControlsPanel from "./components/controls-panel";

class UrlTable extends PureComponent<ITableProps> {
    state = {} as ITableProps;

    static getDerivedStateFromProps(nextProps: ITableProps): ITableProps {
        return _merge({
            data: [],
            fields: [],
            headers: [],
            loading: false,
            selectMode: false,
            onSelect: undefined,
            pagination: {
                serverPaging: false,
                pageSize: 10,
                pageRangeDisplayed: 5,
                marginPagesDisplayed: 1
            },
            search: false,
            sorting: SortingModes.simple,
            showSortingPanel: true,
        }, nextProps);
    }

    render() {
        return <StoreProvider {...this.state}>
            <ControlsPanel>
                {this.state.sorting && this.state.showSortingPanel && <SortingPanel/>}
                {this.state.search && <SearchInput/>}
            </ControlsPanel>
            <Table>
                <Thead/>
                <Tbody/>
            </Table>
            {this.state.pagination && <Pagination/>}
        </StoreProvider>
    }
}

export default UrlTable;
