import React, {useContext} from 'react';
import {TableContext} from "../store/store";
import Header from "./header";
import {IHeaderProp, IStore} from "./types";

interface IProps {

}

function Thead(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <thead>
        <tr>
            {
                store.headers.map((header: IHeaderProp) =>
                    <Header key={store.getHeaderOrFieldValue(header)} data={header}/>)
            }
        </tr>
        </thead>
    )
}

export default Thead;
