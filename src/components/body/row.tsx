import React, {useContext} from 'react';
import Cell from "./cell";
import FieldModel from "../../store/models/field";
import {TableContext} from "../../store/context";
import {IRecord, IStore} from "../../@typings/types";
import classNames from 'classnames';
import {observer} from "mobx-react";

interface IProps {
    record: IRecord
}

function Row(props: IProps): React.ReactElement {
    const store: IStore = useContext(TableContext);
    const selectRecord = (): void => store.select(props.record);

    return (
        <tr onClick={selectRecord} className={classNames({
            'selected': store.selectedItems[props.record[store.props.indexField]]
        })}>
            {store.fields.map((field: FieldModel) =>
                <Cell key={field.property} field={field} record={props.record} editable={store.isEditableField(field)}/>
            )}
        </tr>
    );
}

export default observer(Row);
