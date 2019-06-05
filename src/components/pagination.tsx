import React, {useContext} from 'react';
import ReactPaginate, {ReactPaginateProps} from 'react-paginate';
import {IStore} from "./types";
import {TableContext} from "../store/store";

function Pagination() {
    const store: IStore = useContext(TableContext);
    const onPageChange = (page: { selected: number }): void => {
        store.pagination.currentPage = page.selected;
    };
    const options = store.pagination as ReactPaginateProps;

    return (
        <div className="table__pagination">
            <ReactPaginate onPageChange={onPageChange} {...options} />
        </div>
    );
}

export default Pagination;
