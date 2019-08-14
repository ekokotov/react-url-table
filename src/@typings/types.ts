import React from 'react';
import {ReactPaginateProps} from "react-paginate";
import FieldModel from "../store/models/field";
import Header from "../store/models/header";
import {XOR} from "./utils";
import {MoveFocusKeyCodes} from "../components/body/editable-cell";

export interface IHeaderPropObject {
    name: string,
    property?: string,
    sortable?: boolean,
    searchable?: boolean,
    editable?: boolean,

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
    pageSize: number
}

interface ITableBase {
    search?: boolean,
    sorting?: keyof typeof SortingModes | false,
    showSortingPanel?: boolean,
    fields: IFieldsProp[],
    headers?: IHeaderProp[],
    indexField: string,
    editable?: boolean,
    onEdit?: (newValue: string | null, propertyName: string, record: IRecord) => void,
    pagination?: IPaginateProps | false,
    onSelect?: (records: IRecord[]) => void,
    selectMode?: keyof typeof SelectModes | false,
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

export type IFilterFunction = (data: IRecord[]) => IRecord[];
export type IPaginateFunction = (data: IRecord[]) => IDisplayData;

export type IRecord = object;

export interface IDisplayData {
    data: IRecord[],
    pageCount: number
}

export type MoveFocusKeyCodesType = typeof MoveFocusKeyCodes[number] ;

export interface IStore {
    props: ITableProps,
    _loadedData: IRecord[] | undefined,
    error: undefined | string,
    headers?: Header[],
    fields: FieldModel[],
    displayData: IDisplayData,
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
    filterHandlers: () => IFilterFunction[],
    editCell: (value: string | null, record: IRecord, field: FieldModel) => void,
    isEditableField: (Field: FieldModel) => boolean,
    searchFilter: IFilterFunction,
    sortFilter: IFilterFunction,
    paginateFilter: IPaginateFunction,
    setFocus: (cellIndex: number, rowIndex: number) => void,
    focusCell: {cellIndex: number, rowIndex: number} | undefined,
    moveFocus: (keyCode: MoveFocusKeyCodesType) => void
}

