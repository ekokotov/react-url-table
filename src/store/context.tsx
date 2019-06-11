import React, {createContext} from 'react';
import {ITableProps} from "../components/types";
import {useRootStore} from "./store";

export const TableContext = createContext(null);

export const StoreProvider = (
    props: React.PropsWithChildren<ITableProps>
): React.ReactElement => {
    const store = useRootStore(props);

    return (
        <TableContext.Provider value={store}>
            {props.children}
        </TableContext.Provider>
    );
};
