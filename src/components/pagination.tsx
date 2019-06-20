import React, {useContext} from 'react';
import ReactPaginate, {ReactPaginateProps} from 'react-paginate';
import {IStore} from "../@typings/types";
import {TableContext} from "../store/context";
import {observer} from "mobx-react";

function Pagination(): React.ReactElement | null {
    const store: IStore = useContext(TableContext);
    const onPageChange = (page: { selected: number }): void => {
        store.currentPage = page.selected;
    };

    if ( store.displayData.pageCount > 1 && !store.isLoading && store.displayData.data.length) {
        return <div className="table__pagination">
            <ReactPaginate onPageChange={onPageChange} {...store.props.pagination as ReactPaginateProps}
                           forcePage={store.currentPage}
                           pageCount={store.displayData.pageCount}/>
        </div>;
    }

    return null
}

export default observer(Pagination);
