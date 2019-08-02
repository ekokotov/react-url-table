import React from 'react';
import Thead from './components/head/thead';
import Tbody from './components/body/tbody';
import Table from "./components/table";
import {ITableProps, SortingModes} from "./@typings/types";
import Pagination from "./components/pagination";
import {StoreProvider} from "./store/context";
import SortingPanel from "./components/controls-panel/sorting";
import SearchInput from "./components/controls-panel/searchInput";
import ControlsPanel from "./components/controls-panel";

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
    fields: [],
    headers: [],
    selectMode: false,
    editable: false,
    pagination: {
        pageSize: 10,
        pageRangeDisplayed: 5,
        marginPagesDisplayed: 1
    },
    search: false,
    sorting: SortingModes.simple,
    showSortingPanel: true,
};

export default UrlTable;
