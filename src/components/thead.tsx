import React, {useContext} from 'react';
import {Store} from "../store/context";
import Header from "./header";
import {IHeaderProp, IStore} from "./types";

interface IProps {

}

function Thead(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const [store]: [IStore] = useContext(Store);

    return (
        <thead>
        <tr>
            {store.headers.map((header: IHeaderProp) => <Header key={header.name} data={header}/>)}
        </tr>
        </thead>
    )
}

export default Thead;
