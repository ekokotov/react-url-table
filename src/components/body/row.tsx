import classNames from 'classnames';
import {observer} from "mobx-react";
import React, {useContext} from 'react';
import {IRecord, IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";
import FieldModel from "../../store/models/field";
import Cell from "./cell";

interface IProps {
    record: IRecord
}

function Row(props: IProps): React.ReactElement {
    const store: IStore = useContext(TableContext);
    const selectRecord = (): void => store.select(props.record);

    return (
        <tr onClick={selectRecord} className={classNames({
            'url_table__row--selected': store.selectedItems[props.record[store.props.indexField]]
        })}>
            {store.fields.map((field: FieldModel) =>
                <Cell key={field.property} field={field} record={props.record} editable={store.isEditableField(field)}/>
            )}
        </tr>
    );
}

export default observer(Row);
