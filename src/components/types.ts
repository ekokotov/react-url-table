import React from 'react';
import {ReactPaginateProps} from "react-paginate";
import Header from "../store/header";
import Field from "../store/field";

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

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

export interface IPaginateProps extends Partial<ReactPaginateProps> {
    pageCount?: number,
    currentPage?: number,
    pageSize?: number,
    serverPaging?: boolean,
    show?: boolean
}

type ITableBase = {
    search?: 'global' | boolean,
    sorting?: SortingModes | keyof typeof SortingModes | false,
    fields: IFieldsProp[],
    headers?: IHeaderProp[],
    uniqProp: string,
    pagination?:  IPaginateProps | false ,
    onSelect?: (record: object) => void,
    selectMode?: SelectModes | keyof typeof SelectModes | false,
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
    compound,
    simple
}

export enum SelectModes {
    single = 'single',
    multiple = 'multiple'
}

export interface IStore {
    props: React.ComponentProps<any>,
    data: any[],
    _data: any[],
    headers?: Header[],
    fields?: Field[],
    displayData: any[],
    inProgress: boolean,
    loadByUrl: () => void,
    selectedItems: {},
    select: (row: object) => void,
    pageCount: number,
    currentPage: number,
}
