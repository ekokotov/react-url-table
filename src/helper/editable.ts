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
