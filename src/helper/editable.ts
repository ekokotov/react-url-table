import React, {useCallback, useEffect, useState} from 'react';

export function moveCaretToEndOfText(el: HTMLTableDataCellElement) {
    const target = el.nodeType === Node.TEXT_NODE ? el : el.childNodes[0];

    if (target !== null && target.nodeValue !== null) {
        const sel = getSelection();
        if (sel !== null) {
            const range = document.createRange();

            range.setStart(target, target.nodeValue.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}


export const MoveFocusKeyCodes = [38, 40, 37, 39];
const StartEditCodes = [13, 32]; //Enter and Space
const EscapeCode = 27;

type EditableEvents = {
    onEdit: () => void,
    onFocus: () => void,
    onMoveFocus: (keyCode: number) => void
}

export function useFocusAndEditable(cellRef: React.RefObject<HTMLTableCellElement>, isInFocus: boolean,
                                    events: EditableEvents) {
    const [editMode, setEditMode] = useState(false);

    const stopEditHandler = useCallback((e: Event): void => {
        setEditMode(false);
        events.onEdit();
    }, []);

    const setEditModeHandler = useCallback((e: Event): void => setEditMode(true), []);

    const setEditModeOrFocus = useCallback((e: Event): void => {
        if (isInFocus) {
            setEditModeHandler(e);
            e.stopPropagation();
        } else {
            events.onFocus();
        }
    }, [isInFocus]);

    const moveFocus = useCallback((e: KeyboardEvent): void => {
        if (!editMode) {
            if (MoveFocusKeyCodes.includes(e.keyCode)) {
                events.onMoveFocus(e.keyCode);
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
            cellRef.current.addEventListener('click', setEditModeOrFocus);
            cellRef.current.addEventListener("dblclick", setEditModeHandler);
            if (editMode) {
                moveCaretToEndOfText(cellRef.current)
            }
            if (isInFocus || editMode) {
                cellRef.current.focus();
                cellRef.current.addEventListener("keydown", moveFocus);
                cellRef.current.addEventListener("blur", stopEditHandler);
            }
        }
        return () => {
            if (cellRef.current) {
                cellRef.current.removeEventListener('click', setEditModeOrFocus);
                cellRef.current.removeEventListener("dblclick", setEditModeHandler);
                if (isInFocus) {
                    cellRef.current.removeEventListener("keydown", moveFocus);
                    cellRef.current.removeEventListener("blur", stopEditHandler);
                }
            }
        };
    }, [isInFocus, cellRef.current, editMode]);

    return editMode;
}
