import React from 'react';
import FieldModel from "../store/field";
import {observer} from "mobx-react";
import {IRecord} from "../@typings/types";

interface IProps {
    record: IRecord,
    field: FieldModel
}

function Cell(props: IProps) {

    return (
        <td>{props.field.render(props.record)}</td>
    );
}

export default observer(Cell);
