import React from "react";
import {IHeaderProp, IHeaderPropObject} from "../../@typings/types";

export interface IHeaderModel extends IHeaderPropObject {
}

class HeaderModel implements IHeaderModel {
    name: string;
    index: number;
    sortable: boolean = true;
    searchable: boolean = true;

    renderHandler?(name: string): string | React.ReactElement

    constructor(props: IHeaderProp, index: number) {
        this.index = index;
        if (typeof props === 'string') {
            this.name = props;
        } else {
            this.renderHandler = props.render;
            this.name = props.name;
            if (props.searchable === false) {
                this.searchable = props.searchable;
            }
            if (props.sortable === false) {
                this.sortable = props.sortable;
            }
        }
        return this;
    }

    render(): string | React.ReactElement {
        return this.renderHandler ? this.renderHandler(this.name) : this.name;
    }
}

export default HeaderModel;
