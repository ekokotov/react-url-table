import classNames from 'classnames';
import {observer} from "mobx-react";
import React, {useContext} from 'react';
import {IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";
import HeaderModel from "../../store/models/header";

interface IProps {
    header: HeaderModel
}

function Header(props: IProps): React.ReactElement {
    const header = props.header;
    const store: IStore = useContext(TableContext);
    const property = store.fields[header.index].property;
    const sortingOptions = store.sorting[property];
    const sortingEvent = () => store.sort(header);
    const getHeaderEvents: object = {
        onClick: (store.props.sorting && header.sortable ? sortingEvent : null)
    };

    return (
        <th {...getHeaderEvents}
            className={classNames('url_table__header',
                sortingOptions ? `url_table__header--sorted-${sortingOptions.order}` : null)}>
            {header.render()}
        </th>
    )
}

export default observer(Header);
