import React, {createContext, useReducer} from 'react';
import initialStore from './initialStore';
import reducer, {Action} from './reducer';
import {IStore, ITableProps} from "../components/types";
import {paginate} from "../helper/pagination";

export const Store: React.Context<any> = createContext<[IStore, React.Dispatch<Action>]>(null);

interface IProps {
    initialState: ITableProps
}

export const StoreProvider = (
    props: React.PropsWithChildren<IProps>
): React.ReactElement => {
    const initialStoreValue = { // TODO: mve to external function ?
        ...initialStore,
        ...props.initialState,
        ...(!props.initialState.url && { // just pass raw data to display
            displayData: paginate(props.initialState.data, props.initialState.pageSize, initialStore.currentPage),
            inProgress: false
        }),
        ...{
            pagination: {
                ...initialStore.pagination,
                ...props.initialState.pagination,
                ...(props.initialState.data.length && {pageCount: Math.round(props.initialState.data.length / props.initialState.pageSize)})
            }
        }
    };

    const stateWithDispatch = useReducer(reducer, initialStoreValue);

    return (
        <Store.Provider value={stateWithDispatch}>
            {props.children}
        </Store.Provider>
    );
};
