import React from 'react';
import {IHeaderProp} from "./types";

interface IProps {
    data?: IHeaderProp
}

function Header(props: IProps): React.ReactElement {
    const {render, name} = props.data;

    return (
        <th>{render ? render(name) : name}</th>
    )
}

export default Header;
