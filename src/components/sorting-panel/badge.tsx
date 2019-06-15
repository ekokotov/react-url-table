import React from 'react';
import {ISortingOptions} from "../../@typings/types";
import {observer} from "mobx-react";

interface IProps extends ISortingOptions {
    property: string,
    onClose: () => void
}

function Badge(props: IProps) {

    return (
        <div className={`table__sorting__badge table__sorting__badge--${props.order}`}>
            {props.headerName}
            <span className="table__sorting__badge--close" onClick={props.onClose}>X</span>
        </div>
    );
}

export default observer(Badge);
