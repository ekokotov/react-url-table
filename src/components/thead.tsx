import React, {useContext} from 'react';
import {TableContext} from "../store/context";
import Header from "./header";
import {IStore} from "../@typings/types";
import HeaderModel from "../store/header";
import {observer} from "mobx-react";

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
