import React, {useContext} from 'react';
import {IStore} from "../@typings/types";
import {TableContext} from "../store/context";
import {observer} from "mobx-react";

function Loading() {
    const store: IStore = useContext(TableContext);

    return (
        <tr className="table__progress">
            <td colSpan={store.fields.length}>Loading...</td>
        </tr>
    );
}

export default observer(Loading);
