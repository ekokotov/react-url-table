import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react";

import '../styles/index.css';
import {IStore} from "../@typings/types";
import {TableContext} from "../store/context";

function Table(props: React.PropsWithChildren<any>): React.ReactElement {
    const store: IStore = useContext(TableContext);
    useEffect(() => {
        window["__store"] = store;
    }, []);

    useEffect(() => {
        if (store.props.url) {
            store.loadByUrl();
        }
    }, [store.props.url]);

    return (
        <table className={'table'}>
            {props.children}
        </table>
    );
}

export default observer(Table);
