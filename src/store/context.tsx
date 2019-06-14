import React, {createContext} from 'react';
import {IStore, ITableProps} from "../@typings/types";
import {useRootStore} from "./store";

export const TableContext = createContext({} as IStore);

export const StoreProvider = (
    props: React.PropsWithChildren<ITableProps>
): React.ReactElement => {
    const store: IStore = useRootStore(props);

    return (
        <TableContext.Provider value={store}>
            {props.children}
        </TableContext.Provider>
    );
};
