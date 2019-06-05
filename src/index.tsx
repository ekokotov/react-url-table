import React from 'react';
import Thead from './components/thead';
import Tbody from './components/tbody';
import Table from "./components/table";
import {ITableProps} from "./components/types";
import Pagination from "./components/pagination";
import {StoreProvider} from "./store/context";

function UrlTable(props: ITableProps): React.ReactElement {
    return (
        <StoreProvider {...props}>
            <Table>
                <Thead/>
                <Tbody/>
            </Table>
            <Pagination/>
        </StoreProvider>
    );
}

export default React.memo(UrlTable);
