import React, {useContext} from 'react';
import {Store} from "../store/context";
import Header from "./header";
import {IHeaderProp, IHeaderPropObject, IStore} from "./types";

interface IProps {

}

function Thead(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const [store]: [IStore] = useContext(Store);
    const renderHeader = (header: IHeaderProp): string => {
        if(typeof header === 'string') {
            return header;
        }
        return header.name;
    };

    return (
        <thead>
        <tr>
            {
                store.headers.map((header: IHeaderProp) =>
                    <Header key={renderHeader(header)} data={header}/>)
            }
        </tr>
        </thead>
    )
}

export default Thead;
