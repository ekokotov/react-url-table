import React, {useContext} from 'react';
import {IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";

function NoData() {
    const store: IStore = useContext(TableContext);

    return (
        <tr className="table__progress">
            <td colSpan={store.fields.length}>No Data...</td>
        </tr>
    );
}

export default NoData;
