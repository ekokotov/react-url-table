import React, {useContext} from 'react';
import {IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";
import {observer} from "mobx-react";

function Loading() {
    const store: IStore = useContext(TableContext);
    const loadingComponent = store.props.loadingComponent ? store.props.loadingComponent(store.isLoading) : 'Loading...';

    return (
        <tr className="table__progress">
            <td colSpan={store.fields.length}>{loadingComponent}</td>
        </tr>
    );
}

export default observer(Loading);
