import React from 'react';
import FieldModel from "../store/field";

interface IProps {
    record: Object,
    field: FieldModel
}

function Cell(props: IProps) {

    return (
        <td>{props.field.render(props.record)}</td>
    );
}

export default Cell;
