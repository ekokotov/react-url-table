import React, {useContext, useEffect} from 'react';
import {Store} from "../store/context";
import {Action} from "../store/reducer";
import {loadDataFromUrl} from "../store/actions";
import {IStore} from "./types";

const styles = require('../styles/index.css');

interface IProps {

}

function Table(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const [store, dispatch]: [IStore, React.Dispatch<Action>] = useContext(Store);

    if(store.url) {
        useEffect(
            () => {
                loadDataFromUrl(store.url, dispatch);
            }, [store.url]
        );
    }

    return (
        <table className={'table'}>
            {props.children}
        </table>
    );
}

export default Table;
