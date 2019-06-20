import React, {useContext} from 'react';
import {ISortingOptions, IStore} from "../../../@typings/types";
import {TableContext} from "../../../store/context";
import Badge from "./badge";
import {observer} from "mobx-react";

function SortingPanel() {
    const store: IStore = useContext(TableContext);
    const sortingOptions: Array<[string, ISortingOptions]> = Object.entries(store.sorting);
    const removeFromSorting = (property: string) => () => store.removeFromSorting(property);

    return (
        <div className="table__sorting-panel">
            {sortingOptions.map(([property, sortingOpts]) =>
                <Badge key={property} property={property} headerName={sortingOpts.headerName}
                       order={sortingOpts.order}
                       onClose={removeFromSorting(property)}/>)}
        </div>
    );
}

export default observer(SortingPanel);
