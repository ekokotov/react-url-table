import React, {createContext} from 'react';
import {IStore, ITableProps} from "../@typings/types";
import {useRootStore} from "./index";

export const TableContext = createContext({} as IStore);

export const StoreProvider = (
    props: React.PropsWithChildren<ITableProps>
): React.ReactElement =>
    <TableContext.Provider value={useRootStore(props)}>
        {props.children}
    </TableContext.Provider>;
