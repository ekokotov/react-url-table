import React, {useContext} from 'react';
import {IStore} from "./types";
import {TableContext} from "../store/store";

function Loading() {
    const store: IStore = useContext(TableContext);

    return (
        <tr className="table__progress">
            <td colSpan={store.fields.length}>Loading...</td>
        </tr>
    );
}

export default Loading;
