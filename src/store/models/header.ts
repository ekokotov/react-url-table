import React from "react";
import {IHeaderProp, IHeaderPropObject} from "../../@typings/types";

class HeaderModel implements IHeaderPropObject {
    public name: string;
    public index: number;
    public sortable: boolean = true;
    public searchable: boolean = true;
    public editable: boolean | undefined;

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
            if (props.hasOwnProperty('editable')) {
                this.editable = props.editable;
            }
        }
        return this;
    }

    public renderHandler?(name: string): string | React.ReactElement

    public render(): string | React.ReactElement {
        return this.renderHandler ? this.renderHandler(this.name) : this.name;
    }
}

export default HeaderModel;
