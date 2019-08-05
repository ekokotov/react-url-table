import _get from "lodash/get";
import React from "react";
import {IFieldPropObject, IFieldsProp, IRecord} from "../../@typings/types";

class FieldModel implements IFieldPropObject {
    public index: number;
    public property: string;

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
    public renderHandler?(value: any, object: IRecord): string | React.ReactElement

    public render(object: IRecord): string | React.ReactElement {
        const value = _get(object, this.property);

        return this.renderHandler ? this.renderHandler(value, object) : value;
    }
}

export default FieldModel;
