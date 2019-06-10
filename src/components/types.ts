import React from 'react';
import {ReactPaginateProps} from "react-paginate";
import Header from "../store/header";
import Field from "../store/field";

export interface IHeaderPropObject {
    name: string,
    property?: string,

    render?(name: string, property: string): string | React.ReactElement
}

export interface IFieldPropObject {
    property: string,

    render?(value: any, object: Object): string | React.ReactElement
}

export type IHeaderProp = IHeaderPropObject | string
export type IFieldsProp = IFieldPropObject | string

interface IPaginateProps extends Partial<ReactPaginateProps> {
    pageCount?: number,
    currentPage?: number,
    pageSize?: number,
    serverPaging?: boolean,
    show?: boolean
}

export interface ITableProps {
    url?: string,
    fetchSuccess?: (res: any) => [],
    data?: any[],
    search?: 'global' | boolean,
    sorting?: SortingModes | keyof typeof SortingModes | false,
    fields: IFieldsProp[],
    headers?: IHeaderProp[],
    uniqProp: string,
    pagination?: IPaginateProps | false,
    onSelect?: (record: object) => void,
    selectMode?: SelectModes| keyof typeof  SelectModes | false,
}

export enum SortingModes {
    compound,
    simple
}

export enum SelectModes {
    single = 'single',
    multiple = 'multiple'
}

export interface IStore extends Partial<ITableProps> {
    data: any[],
    headers?: Header[],
    fields?: Field[],
    displayData: any[],
    inProgress: boolean,
    pagination: IPaginateProps,
    mergeWithProps: (props: ITableProps) => void,
    _initPagination: (props: ITableProps) => void,
    _loadByUrl: (props: ITableProps) => void,
    selectedItems: any[],
    _select: (row: object) => any
    onSelect: (row: object) => any
}
