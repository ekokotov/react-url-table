import React from "react";
import {IHeaderProp} from "../components/types";

class HeaderModel {
    property?: string;
    name: string;
    index: number;

    renderHandler?(name: string, property: string): string | React.ReactElement

    constructor(props: IHeaderProp, index: number) {
        this.index = index;
        if (typeof props === 'string') {
            this.name = props;
        } else {
            this.property = props.property;
            this.renderHandler = props.render;
            this.name = props.name;
        }
        return this;
    }

    render(): string | React.ReactElement {
        return this.renderHandler ? this.renderHandler(this.name, this.property) : this.name;
    }
}

export default HeaderModel;
