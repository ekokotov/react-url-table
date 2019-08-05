import React from 'react';
import {ITableProps, SortingModes} from "./@typings/types";
import Tbody from './components/body/tbody';
import ControlsPanel from "./components/controls-panel";
import SearchInput from "./components/controls-panel/searchInput";
import SortingPanel from "./components/controls-panel/sorting";
import Thead from './components/head/thead';
import Pagination from "./components/pagination";
import Table from "./components/table";
import {StoreProvider} from "./store/context";

function UrlTable(props: ITableProps) {
    return <StoreProvider {...props}>
        <ControlsPanel>
            {props.sorting && props.showSortingPanel && <SortingPanel/>}
            {props.search && <SearchInput/>}
        </ControlsPanel>
        <Table>
            <Thead/>
            <Tbody/>
        </Table>
        {props.pagination && <Pagination/>}
    </StoreProvider>
}

UrlTable.defaultProps = {
    data: [],
    editable: false,
    fields: [],
    headers: [],
    pagination: {
        marginPagesDisplayed: 1,
        pageRangeDisplayed: 5,
        pageSize: 10
    },
    search: false,
    selectMode: false,
    showSortingPanel: true,
    sorting: SortingModes.simple,
};

export default UrlTable;
