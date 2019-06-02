import React, {useContext} from 'react';
import ReactPaginate from 'react-paginate';
import {IStore} from "./types";
import {Action} from "../store/reducer";
import {Store} from "../store/context";

function Pagination() {
    const [store, dispatch]: [IStore, React.Dispatch<Action>] = useContext(Store);
    const onPageChange = (page: { selected: number }): void => {
        dispatch({type: 'SET_CURRENT_PAGE', payload: {page: page.selected}})
    };

    return (
        <div className="table__pagination">
            <ReactPaginate onPageChange={onPageChange} {...store.pagination} />
        </div>
    );
}

export default Pagination;
