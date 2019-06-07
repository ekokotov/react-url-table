import React from 'react';
import {ITableProps} from "../components/types";
import {useLocalStore} from 'mobx-react-lite';
import {RootStore, TableContext} from "./store";

export const StoreProvider = (
    props: React.PropsWithChildren<ITableProps>
): React.ReactElement => {
    const store = useLocalStore(() => RootStore);

    store.mergeWithProps(props);

    return (
        <TableContext.Provider value={store}>
            {props.children}
        </TableContext.Provider>
    );
};
