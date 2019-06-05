import React, {useContext} from 'react';
import {IHeaderProp, IStore} from "./types";
import {TableContext} from "../store/store";

interface IProps {
    data: IHeaderProp
}

function Header(props: IProps): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <th>{store.renderHeader(props.data)}</th>
    )
}

export default Header;
