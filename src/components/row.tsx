import React, {useContext} from 'react';
import {Store} from "../store/context";
import {IStore} from "./types";

interface IProps {
    data: any
}

function Row(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const [store]: [IStore] = useContext(Store);

    return (
        <tr>
            {store.fields.map((prop: string) => <td key={prop}>{props.data[prop]}</td>)}
        </tr>
    );
}

export default Row;
