import React, {useContext} from 'react';
import Cell from "./cell";
import FieldModel from "../store/field";
import {TableContext} from "../store/store";
import {IStore} from "./types";
import classNames from 'classnames';
import {observer} from "mobx-react";

interface IProps {
    data: any
}

function Row(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const store: IStore = useContext(TableContext);

    return (
        <tr onClick={() => store._select(props.data)} className={classNames({
            'selected': store.selectedItems.includes(props.data)
        })}>
            {store.fields.map((field: FieldModel) =>
                <Cell key={field.property} field={field} record={props.data}/>
            )}
        </tr>
    );
}

export default observer(Row);
