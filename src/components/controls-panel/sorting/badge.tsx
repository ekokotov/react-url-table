import React from 'react';
import {ISortingOptions} from "../../../@typings/types";
import {observer} from "mobx-react";

interface IProps extends ISortingOptions {
    property: string,
    onClose: () => void
}

function Badge(props: IProps): JSX.Element {
    return (
        <div className={`url_table__sorting_panel__badge url_table__sorting_panel__badge--${props.order}`}>
            {props.headerName}
            <span className="url_table__sorting_panel__badge__close" onClick={props.onClose}>X</span>
        </div>
    );
}

export default observer(Badge);
