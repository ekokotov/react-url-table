import React from "react";
import {IFieldsProp, IFieldPropObject, IRecord} from "../../@typings/types";
import _get from "lodash/get";

class FieldModel implements IFieldPropObject {
    index: number;
    property: string;
    renderHandler?(value: any, object: IRecord): string | React.ReactElement

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

    render(object: IRecord): string | React.ReactElement {
        const value = _get(object, this.property);

        return this.renderHandler ? this.renderHandler(value, object) : value;
    }
}

export default FieldModel;
