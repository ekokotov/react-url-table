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
    const store: IStore = useContext(TableContext);
    const property: string = store.fields[props.header.index].property;
    const sortingOptions = store.sorting[property];
    const sortingEvent = () => store.sort(props.header);
    const getHeaderEvents: object = {
        onClick: (store.props.sorting ? sortingEvent : null)
    };

    return (
        <th {...getHeaderEvents}
            className={classNames('table__header', {
                [`header__sorted--${sortingOptions}`]: sortingOptions
            })}>
            {props.header.render()}
        </th>
    )
}

export default observer(Header);
