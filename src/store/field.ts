import React from "react";
import {IFieldsProp} from "../components/types";
import _get from "lodash/get";

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
        const value = _get(object, this.property);

        return this.renderHandler ? this.renderHandler(value, object) : value;
    }
}

export default FieldModel;
