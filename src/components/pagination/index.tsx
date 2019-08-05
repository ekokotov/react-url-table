import React, {useContext} from 'react';
import ReactPaginate, {ReactPaginateProps} from 'react-paginate';
import {IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";
import {observer} from "mobx-react";

function Pagination(): React.ReactElement | null {
    const store: IStore = useContext(TableContext);
    const onPageChange = (page: { selected: number }): void => {
        store.currentPage = page.selected;
    };

    if (store.displayData.pageCount > 1 && !store.isLoading && store.displayData.data.length) {
        return <ReactPaginate onPageChange={onPageChange} {...store.props.pagination as ReactPaginateProps}
                              forcePage={store.currentPage}
                              containerClassName="url_table__pagination"
                              pageClassName="url_table__pagination__page"
                              activeClassName="url_table__pagination__page--selected"
                              disabledClassName="url_table__pagination__page--disabled"
                              pageCount={store.displayData.pageCount}/>;
    }

    return null
}

export default observer(Pagination);
