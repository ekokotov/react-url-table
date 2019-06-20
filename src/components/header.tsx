import React, {useContext} from 'react';
import classNames from 'classnames';
import HeaderModel from "../store/header";
import {observer} from "mobx-react";
import {IStore} from "../@typings/types";
import {TableContext} from "../store/context";

interface IProps {
    header: HeaderModel
}

function Header(props: IProps): React.ReactElement {
    const header = props.header;
    const store: IStore = useContext(TableContext);
    const property: string = store.fields[header.index].property;
    const sortingOptions = store.sorting[property];
    const sortingEvent = () => store.sort(header);
    const getHeaderEvents: Object = {
        onClick: (store.props.sorting && header.sortable ? sortingEvent : null)
    };

    return (
        <th {...getHeaderEvents}
            className={classNames('table__header', {
                [`header__sorted--${sortingOptions && sortingOptions.order}`]: sortingOptions
            })}>
            {props.header.render()}
        </th>
    )
}

export default observer(Header);
