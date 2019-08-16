import classNames from 'classnames';
import {observer} from "mobx-react";
import React, {useCallback, useContext, useMemo, useRef} from 'react';
import {IRecord, IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";
import FieldModel from "../../store/models/field";
import {useFocusAndEditable} from "../../helper/editable";

interface IProps {
    record: IRecord,
    rowIndex: number,
    field: FieldModel
}

function EditableCell(props: IProps) {
    const store: IStore = useContext(TableContext);
    const cellRef = useRef<HTMLTableDataCellElement>(null);
    const onFocus = useCallback(() => {
        store.setFocus(props.field.index, props.rowIndex)
    }, [props.field.index, props.rowIndex]);

    const onEdit = useCallback(() => {
        if (cellRef.current) {
            store.editCell(cellRef.current.textContent, props.record, props.field);
        }
    }, [cellRef.current, props.record, props.field]);

    const isInFocus = Boolean(store.focusCell &&
        store.focusCell.rowIndex === props.rowIndex &&
        store.focusCell.cellIndex === props.field.index);
    const events = {
        onEdit: onEdit,
        onFocus,
        onMoveFocus: store.moveFocus
    };
    const editEnabled: boolean = useFocusAndEditable(cellRef, isInFocus, events);

    return (
        <td className={classNames('url_table__row__cell', 'url_table__row__cell--editable', {
            'url_table__row__cell--edit': editEnabled,
            'url_table__row__cell--focus': isInFocus
        })}
            ref={cellRef}
            contentEditable={editEnabled}
            suppressContentEditableWarning={true}
            tabIndex={0}>
            {props.field.render(props.record)}
        </td>
    );
}

export default observer(EditableCell);
