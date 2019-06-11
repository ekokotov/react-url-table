import React from 'react';
import HeaderModel from "../store/header";
import {observer} from "mobx-react";

interface IProps {
    header: HeaderModel
}

function Header(props: IProps): React.ReactElement {
    return (
        <th>{props.header.render()}</th>
    )
}

export default observer(Header);
