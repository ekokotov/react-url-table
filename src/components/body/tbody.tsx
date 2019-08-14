import _get from "lodash/get";
import {observer} from "mobx-react";
import React, {useContext} from 'react';
import {IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";
import Loading from "./loading";
import NoData from "./no-data";
import Row from "./row";


function Tbody(props: React.PropsWithChildren<{}>): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <tbody>
        {!store.isLoading && !store.displayData.data.length && <NoData/>}
        {store.isLoading ? <Loading/> :
            store.displayData.data.map((record: any, index: number) =>
                <Row key={_get(record, store.props.indexField)}
                     rowIndex={index}
                     record={record}/>)
        }
        </tbody>
    );
}

export default observer(Tbody);
