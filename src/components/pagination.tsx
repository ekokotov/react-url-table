import React, {useContext} from 'react';
import ReactPaginate from 'react-paginate';
import {IStore} from "./types";
import {Action} from "../store/reducer";
import {Store} from "../store/context";

function Pagination() {
    const [store, dispatch]: [IStore, React.Dispatch<Action>] = useContext(Store);

    // const paginationSettings: ReactPaginateProps = {
    //     pageCount: Math.round(store.data.length / store.pageSize),
    //     pageRangeDisplayed: 5,
    //     marginPagesDisplayed: 1
    //     // initialPage: 0
    // };

    const onPageChange = (page: { selected: number }): void => {
        dispatch({type: 'SET_CURRENT_PAGE', payload: {page: page.selected}})
    };

    return (
        <div className="table__pagination">
            <ReactPaginate {...store.pagination} onPageChange={onPageChange}/>
        </div>
    );
}

export default Pagination;
