import React, {useContext} from 'react';
import FieldModel from "../../store/models/field";
import {observer} from "mobx-react";
import {IRecord, IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";

interface IProps {
    record: IRecord,
    field: FieldModel
}

function EditableCell(props: IProps) {
    const store: IStore = useContext(TableContext);

    return (
        <td contentEditable
            suppressContentEditableWarning={true}
            onBlur={e => store.editCell(e.currentTarget.textContent, props.record, props.field)}>
            {props.field.render(props.record)}</td>
    );
}

export default observer(EditableCell);
