import React from 'react';
import {observer} from "mobx-react";

import '../styles/index.css';
import {ITableProps} from "./types";

function Table(props: React.PropsWithChildren<ITableProps>): React.ReactElement {
    return (
        <table className={'table'}>
            {props.children}
        </table>
    );
}

export default observer(Table);
