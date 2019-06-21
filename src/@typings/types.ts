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

    render?(value: any, object: IRecord): string | React.ReactElement
}

export type IHeaderProp = IHeaderPropObject | string
export type IFieldsProp = IFieldPropObject | string

export interface IPaginateProps extends Partial<ReactPaginateProps> {
    pageCount?: number,
    currentPage?: number,
    pageSize: number,
    serverPaging?: boolean
}

type ITableBase = {
    search?: 'global' | boolean,
    sorting?: keyof typeof SortingModes | false,
    showSortingPanel?: boolean,
    fields: IFieldsProp[],
    headers?: IHeaderProp[],
    uniqProp: string,
    pagination?: IPaginateProps | false,
    onSelect?: (record: IRecord[]) => void,
    selectMode?: keyof typeof SelectModes | false,
    loading?: boolean
    loadingComponent?: (isLoading?: boolean) => React.ReactElement
}

interface ITableWithUrl {
    url: string,
    fetchSuccess?: (res: any) => []
}

interface ITableWithData {
    data: IRecord[]
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

export interface ISortingOptions {
    order: SortingValues,
    headerName: string
}

export type IFilterFunction<T> = (data: T[]) => T[];

export interface IRecord {
    (prop: string): any;
}

export interface IStore {
    props: ITableProps,
    _data: IRecord[] | undefined,
    error: undefined | string,
    headers?: Header[],
    fields: Field[],
    displayData: { data: IRecord[], pageCount: number },
    inProgress: boolean,
    isLoading: boolean,
    loadByUrl: () => void,
    selectedItems: { [x: string]: IRecord; },
    sorting: { [property: string]: ISortingOptions },
    removeFromSorting: (property: string) => void,
    select: (row: IRecord) => void,
    sort: (header: Header) => void,
    currentPage: number,
    searchQuery: string
    search: (query: string) => void,
    filterHandlers: () => Function[],
    searchFilter: IFilterFunction<IRecord>,
    sortFilter: IFilterFunction<IRecord>,
    paginateFilter: (data: IRecord[]) => { data: IRecord[], pageCount: number },
}
