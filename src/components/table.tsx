import {observer} from "mobx-react";
import React, {Fragment, useContext, useEffect} from 'react';

import {IStore} from "../@typings/types";
import {TableContext} from "../store/context";
import '../styles/index.css';

function Table(props: React.PropsWithChildren<any>): React.ReactElement {
    const store: IStore = useContext(TableContext);

    useEffect(() => {
        if (store.props.url) {
            store.loadByUrl();
        }
    }, [store.props.url]);

    return (<Fragment>
            <table className="url_table">
                {props.children}
            </table>
            {store.error && <div className="url_table__error">
              <h3>{store.error}</h3>
            </div>}
        </Fragment>
    );
}

export default observer(Table);
