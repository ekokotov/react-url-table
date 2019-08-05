import {observer} from "mobx-react";
import React, {useContext} from 'react';
import {IStore} from "../../@typings/types";
import {TableContext} from "../../store/context";
import HeaderModel from "../../store/models/header";
import Header from "./header";

function Thead(): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <thead>
        <tr>
            {
                store.headers && store.headers.map((header: HeaderModel) =>
                    <Header key={header.name} header={header}/>)
            }
        </tr>
        </thead>
    )
}

export default observer(Thead);
