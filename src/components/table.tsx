import React from 'react';
import {observer} from "mobx-react";

import '../styles/index.css';

function Table(props: React.PropsWithChildren<any>): React.ReactElement {
    return (
        <table className={'table'}>
            {props.children}
        </table>
    );
}

export default observer(Table);
