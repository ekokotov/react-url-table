import React from 'react';
import {ReactPaginateProps} from "react-paginate";
import Header from "../store/header";
import Field from "../store/field";
import {XOR} from "./utils";

export interface IHeaderPropObject {
    name: string,
    property?: string,
    sortable?: boolean,

    render?(name: string): string | React.ReactElement
}

export interface IFieldPropObject {
    property: string,

    render?(value: any, object: Object): string | React.ReactElement
}

export type IHeaderProp = IHeaderPropObject | string
export type IFieldsProp = IFieldPropObject | string

export interface IPaginateProps extends Partial<ReactPaginateProps> {
    pageCount?: number,
    currentPage?: number,
    pageSize?: number,
    serverPaging?: boolean
    // show?: boolean
}

type ITableBase = {
    search?: 'global' | boolean,
    sorting?: keyof typeof SortingModes | false,
    fields: IFieldsProp[],
    headers?: IHeaderProp[],
    uniqProp: string,
    pagination?: IPaginateProps | false,
    onSelect?: (record: any[]) => void,
    selectMode?: keyof typeof SelectModes | false,
    loading?: boolean
    loadingComponent?: (isLoading?: boolean) => React.ReactElement
}

interface ITableWithUrl {
    url: string,
    fetchSuccess?: (res: any) => []
}

interface ITableWithData {
    data: any[]
}

export type ITableProps = XOR<ITableWithUrl, ITableWithData> & ITableBase

export enum SortingModes {
    compound = 'compound',
    simple = 'simple'
}

export enum SortingValues {
    ASC = 'asc',
    DESC = 'desc'
}

export enum SelectModes {
    single = 'single',
    multiple = 'multiple'
}

export interface IStore {
    props: ITableProps,
    data: any[],
    _data: any[] | undefined,
    headers?: Header[],
    fields: Field[],
    displayData: any[],
    inProgress: boolean,
    isLoading: boolean,
    loadByUrl: () => void,
    selectedItems: { [x: string]: any; },
    sorting: { [x: string]: any; },
    sortedData: any[],
    select: (row: { [x: string]: any; }) => void,
    sort: (header: Header) => void,
    pageCount: number,
    currentPage: number,
}
