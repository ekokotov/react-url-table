import classNames from 'classnames';
import {observer} from "mobx-react";
import React, {useCallback, useContext, useState} from 'react';
import {IRecord, IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";
import FieldModel from "../../store/models/field";

interface IProps {
    record: IRecord,
    field: FieldModel
}

function EditableCell(props: IProps) {
    const store: IStore = useContext(TableContext);
    const [withFocus, setFocusState] = useState(false);
    const editHandler = useCallback((e: React.SyntheticEvent): void => {
        store.editCell(e.currentTarget.textContent, props.record, props.field);
        setFocusState(false);
    }, [props.record, props.field]);

    const focusHandler = useCallback((e: React.SyntheticEvent): void => {
        setFocusState(true);
    }, []);

    return (
        <td contentEditable={true}
            className={classNames('url_table__row__cell', 'url_table__row__cell--editable', {
                'url_table__row__cell--edit': withFocus
            })}
            suppressContentEditableWarning={true}
            onFocus={focusHandler}
            onBlur={editHandler}>
            {props.field.render(props.record)}
        </td>
    );
}

export default observer(EditableCell);
