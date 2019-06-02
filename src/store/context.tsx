import React, {createContext, useReducer} from 'react';
import initialStore from './initialStore';
import reducer, {Action} from './reducer';
import {IStore, ITableProps} from "../components/types";

export const Store: React.Context<any> = createContext<[IStore, React.Dispatch<Action>]>(null);

interface IProps {
    initialState: ITableProps
}

export const StoreProvider = (
    props: React.PropsWithChildren<IProps>
): React.ReactElement => {
    const stateWithDispatch = useReducer(reducer, {...initialStore, ...props.initialState});

    return (
        <Store.Provider value={stateWithDispatch}>
            {props.children}
        </Store.Provider>
    );
};
