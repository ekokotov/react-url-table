import React from "react";
import {IFieldsProp} from "../components/types";

class FieldModel {
    property: string;
    index: number;

    renderHandler?(value: any, object: Object): string | React.ReactElement

    constructor(props: IFieldsProp, index: number) {
        this.index = index;
        if (typeof props === 'string') {
            this.property = props;
        } else {
            this.property = props.property;
            this.renderHandler = props.render;
        }
        return this;
    }

    render(object: Object): string | React.ReactElement {
        return this.renderHandler ? this.renderHandler(object[this.property], object) : object[this.property];
    }
}

export default FieldModel;
