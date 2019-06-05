import React from 'react';
import {ReactPaginateProps} from "react-paginate";

export interface IHeaderOrFieldPropObject {
    name: string,

    render?(name: string): string | React.ReactElement
}

export type IHeaderProp = IHeaderOrFieldPropObject | string
export type IFieldsProp = IHeaderOrFieldPropObject | string

// Functionally the same as Exclude, but for strings only.
// type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T]
// type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>

interface IPaginateProps extends Partial<ReactPaginateProps> {
    pageCount?: number,
    currentPage?: number,
    pageSize?: number,
    serverPaging: boolean
}

export interface ITableProps {
    url?: string,
    data?: any[],
    search?: 'global' | boolean,
    sorting?: SortingModes | keyof typeof SortingModes,
    fields: IFieldsProp[],
    headers?: IHeaderProp[],
    uniqProp: string,
    pagination?: IPaginateProps
}

export enum SortingModes {
    compound,
    simple
}

export interface IStore extends ITableProps {
    data: any[],
    displayData: any[],
    inProgress: boolean,
    pagination: IPaginateProps;
    mergeWithProps: (props: ITableProps) => void,
    renderHeader: (obj: IHeaderProp | IFieldsProp) => string | React.ReactElement
    renderField: (field: IFieldsProp, record: Object) => string | React.ReactElement
    getHeaderOrFieldValue: (obj: IHeaderProp | IFieldsProp) => string
}
