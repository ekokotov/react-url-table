import {observer} from "mobx-react";
import React, {useContext} from 'react';
import {IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";

function Loading() {
    const store: IStore = useContext(TableContext);
    const loadingComponent = store.props.loadingComponent ? store.props.loadingComponent(store.isLoading) : 'Loading...';

    return (
        <tr className="url_table__progress">
            <td colSpan={store.fields.length}>{loadingComponent}</td>
        </tr>
    );
}

export default observer(Loading);
