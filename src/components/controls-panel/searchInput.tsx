import React, {useContext, useRef} from 'react';
import debounce from "lodash/debounce";
import {IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";

const INPUT_DEBOUNCE_MS = 200;

function SearchInput() {
    const store: IStore = useContext(TableContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const onInputHandler = debounce(() => {
        if (inputRef.current) {
            store.search(inputRef.current.value);
        }
    }, INPUT_DEBOUNCE_MS);

    return (<div className="url_table__search">
            <input type="text"
                   ref={inputRef}
                   className="url_table__search__input"
                   placeholder="Search"
                   onChange={onInputHandler}
            />
        </div>
    );
}

export default SearchInput;
