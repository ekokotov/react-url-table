import classNames from 'classnames';
import {observer} from "mobx-react";
import React, {useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {IRecord, IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";
import FieldModel from "../../store/models/field";
import {moveCaretToEndOfText} from "../../helper/editable";

export const MoveFocusKeyCodes = [38, 40, 37, 39];
const StartEditCodes = [13, 32]; //Enter and Space
const EscapeCode = 27;

interface IProps {
    record: IRecord,
    rowIndex: number,
    field: FieldModel
}

function EditableCell(props: IProps) {
    const store: IStore = useContext(TableContext);
    const [editMode, setEditMode] = useState(false);
    const cellRef = useRef<HTMLTableDataCellElement>(null);

    const stopEditHandler = useCallback((e: React.SyntheticEvent): void => {
        store.editCell(e.currentTarget.textContent, props.record, props.field);
        setEditMode(false);
    }, [props.record, props.field]);

    const setEditModeHandler = useCallback((e: React.SyntheticEvent): void =>
        setEditMode(true), []);

    const isInFocus = store.focusCell &&
        store.focusCell.rowIndex === props.rowIndex &&
        store.focusCell.cellIndex === props.field.index;

    const setEditModeOrFocus = useCallback((e: React.SyntheticEvent): void => {
        if (isInFocus) {
            setEditModeHandler(e);
        } else {
            store.setFocus(props.field.index, props.rowIndex);
        }
    }, [isInFocus]);

    const moveFocus = useCallback((e: React.KeyboardEvent<HTMLTableDataCellElement>): void => {
        if (!editMode) {
            if (MoveFocusKeyCodes.includes(e.keyCode)) {
                store.moveFocus(e.keyCode);
            }
            if (StartEditCodes.includes(e.keyCode)) {
                setEditModeHandler(e);
            }
            e.preventDefault();
        } else if (e.keyCode === EscapeCode) {
            stopEditHandler(e);
        }
    }, [editMode, cellRef.current]);

    useEffect(() => {
        if (cellRef.current) {
            if (editMode) {
                moveCaretToEndOfText(cellRef.current)
            }
            if (isInFocus || editMode) {
                cellRef.current.focus();
            }
        }
    }, [isInFocus, cellRef.current, editMode]);

    return (
        <td className={classNames('url_table__row__cell', 'url_table__row__cell--editable', {
            'url_table__row__cell--edit': editMode,
            'url_table__row__cell--focus': isInFocus
        })}
            ref={cellRef}
            onClick={setEditModeOrFocus}
            onDoubleClick={setEditModeHandler}
            {...(isInFocus && {
                suppressContentEditableWarning: true,
                contentEditable: editMode,
                onKeyDown: moveFocus,
                onBlur: stopEditHandler,
                tabIndex: 0
            })}
        >
            {props.field.render(props.record)}
        </td>
    );
}

export default observer(EditableCell);
