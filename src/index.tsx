import React from 'react';
import Thead from './components/thead';
import Tbody from './components/tbody';
import {StoreProvider} from "./store/context";
import Table from "./components/table";
import {ITableProps} from "./components/types";

function UrlTable(props: ITableProps): React.ReactElement {
    return (
        <StoreProvider initialState={props}>
            <Table>
                <Thead/>
                <Tbody/>
            </Table>
        </StoreProvider>
    );
}

export default UrlTable;
