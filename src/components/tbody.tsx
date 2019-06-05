import React, {useContext} from 'react';
import {TableContext} from "../store/store";
import Row from "./row";
import {IStore} from "./types";

interface IProps {

}

function Tbody(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <tbody>
        {
            store.displayData.map((data: any) => <Row key={data[store.uniqProp]} data={data}/>)
        }
        </tbody>
    );
}

export default Tbody;
