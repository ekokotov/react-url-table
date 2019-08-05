import {observer} from "mobx-react";
import React from 'react';
import {IRecord} from "../../@typings/types";
import FieldModel from "../../store/models/field";
import EditableCell from "./editable-cell";

interface IProps {
    record: IRecord,
    field: FieldModel,
    editable: boolean | undefined
}

function Cell(props: IProps) {
    if (props.editable) {
        return <EditableCell {...props}/>
    }

    return (
        <td className="url_table__row__cell">{props.field.render(props.record)}</td>
    );
}

export default observer(Cell);
