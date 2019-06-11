import React, {useContext} from 'react';
import Cell from "./cell";
import FieldModel from "../store/field";
import {TableContext} from "../store/context";
import {IStore} from "./types";
import classNames from 'classnames';
import {observer} from "mobx-react";

interface IProps {
    data: any
}

function Row(props: React.PropsWithChildren<IProps>): React.ReactElement {
    const store: IStore = useContext(TableContext);
    const selectRecord = (): void => store.select(props.data);

    return (
        <tr onClick={selectRecord} className={classNames({
            'selected': store.selectedItems[props.data[store.props.uniqProp]]
        })}>
            {store.fields.map((field: FieldModel) =>
                <Cell key={field.property} field={field} record={props.data}/>
            )}
        </tr>
    );
}

export default observer(Row);
