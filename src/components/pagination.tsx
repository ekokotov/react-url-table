import React, {useContext} from 'react';
import ReactPaginate, {ReactPaginateProps} from 'react-paginate';
import {IStore} from "./types";
import {TableContext} from "../store/context";
import {observer} from "mobx-react";

function Pagination(): React.ReactElement {
    const store: IStore = useContext(TableContext);
    const onPageChange = (page: { selected: number }): void => {
        store.currentPage = page.selected;
    };

    if (store.pageCount > 1 && !store.inProgress && store.displayData.length) {
        return <div className="table__pagination">
            <ReactPaginate onPageChange={onPageChange} {...store.props.pagination as ReactPaginateProps}
                           pageCount={store.pageCount}/>
        </div>;
    }

    return null
}

export default observer(Pagination);
