import React, {useContext} from 'react';
import {TableContext} from "../store/store";
import Header from "./header";
import {IStore} from "./types";
import HeaderModel from "../store/header";

interface IProps {

}

function Thead(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <thead>
        <tr>
            {
                store.headers.map((header: HeaderModel) =>
                    <Header key={header.name} header={header}/>)
            }
        </tr>
        </thead>
    )
}

export default Thead;
