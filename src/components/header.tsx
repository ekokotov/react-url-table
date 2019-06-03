import React from 'react';
import {IHeaderProp} from "./types";

interface IProps {
    data: IHeaderProp
}

function Header(props: IProps): React.ReactElement {
    const renderHeader = (data: IHeaderProp) => {
        if (typeof data === 'string') {
            return data;
        }
        return data.render ? data.render(data.name) : data.name;
    };

    return (
        <th>{renderHeader(props.data)}</th>
    )
}

export default Header;
