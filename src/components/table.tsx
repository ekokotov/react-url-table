import React, {useContext, useEffect} from 'react';
import {TableContext} from "../store/store";
import {IStore} from "./types";
import {load} from "../helper/http";
import {observer} from "mobx-react";

import '../styles/index.css';

interface IProps {

}

function Table(props: React.PropsWithChildren<IProps>): React.ReactElement {
    // const store: IStore = useContext(TableContext);
    //
    // useEffect(
    //     () => {
    //         if (store.url) {
    //             load(store.url).then((res: any) => store.data = res.results);
    //         }
    //     }, [store.url]
    // );

    return (
        <table className={'table'}>
            {props.children}
        </table>
    );
}

export default observer(Table);
