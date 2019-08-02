import React, {useContext} from 'react';
import {TableContext} from "../../store/context";
import Row from "./row";
import {IStore} from "../../@typings/types";
import {observer} from "mobx-react";
import _get from "lodash/get";
import Loading from "./loading";
import NoData from "./no-data";


function Tbody(props: React.PropsWithChildren<{}>): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <tbody>
        {!store.isLoading && !store.displayData.data.length && <NoData/>}
        {store.isLoading ? <Loading/> :
            store.displayData.data.map((record: any) => <Row key={_get(record, store.props.indexField)} record={record}/>)
        }
        </tbody>
    );
}

export default observer(Tbody);
