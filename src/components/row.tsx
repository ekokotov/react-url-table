import React, {useContext} from 'react';
import {TableContext} from "../store/store";
import {IFieldsProp, IStore} from "./types";
import Cell from "./cell";

interface IProps {
    data: any
}

function Row(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <tr>
            {store.fields.map((field: IFieldsProp) =>
                <Cell key={store.getHeaderOrFieldValue(field)} field={field} record={props.data}/>
            )}
        </tr>
    );
}

export default Row;
