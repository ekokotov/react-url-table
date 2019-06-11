import React, {useContext} from 'react';
import {TableContext} from "../store/store";
import Row from "./row";
import {IStore} from "./types";
import {observer} from "mobx-react";
import _get from "lodash/get";
import Loading from "./loading";

interface IProps {

}

function Tbody(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <tbody>
        {store.inProgress ? <Loading colspan={store.fields.length}/> :
            store.displayData.map((data: any) => <Row key={_get(data, store.uniqProp)} data={data}/>)}
        </tbody>
    );
}

export default observer(Tbody);
