import React, {useContext} from 'react';
import {IFieldsProp, IStore} from "./types";
import {TableContext} from "../store/store";

interface IProps {
    record: Object,
    field: IFieldsProp
}

function Cell(props: IProps) {
    const store: IStore = useContext(TableContext);

    return (
        <td>{store.renderField(props.field, props.record)}</td>
    );
}

export default Cell;
