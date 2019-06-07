import React from 'react';
import HeaderModel from "../store/header";

interface IProps {
    header: HeaderModel
}

function Header(props: IProps): React.ReactElement {
    return (
        <th>{props.header.render()}</th>
    )
}

export default Header;
