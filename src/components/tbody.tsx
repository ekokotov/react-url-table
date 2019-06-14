import React, {useContext} from 'react';
import {TableContext} from "../store/context";
import Row from "./row";
import {IStore} from "../@typings/types";
import {observer} from "mobx-react";
import _get from "lodash/get";
import Loading from "./loading";

interface IProps {

}

function Tbody(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <tbody>
        {store.inProgress ? <Loading/> :
            store.displayData.map((data: any) => <Row key={_get(data, store.props.uniqProp)} data={data}/>)}
        </tbody>
    );
}

export default observer(Tbody);
