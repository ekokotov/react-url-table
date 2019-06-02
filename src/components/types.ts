import React from 'react';
import {ReactPaginateProps} from "react-paginate";

export interface IHeaderProp {
    name: string,

    render?(name: string): string | React.ReactElement
}

// Functionally the same as Exclude, but for strings only.
// type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T]
// type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>

interface IPaginateProps extends Partial<ReactPaginateProps>{
    pageCount?: number;
}
export interface ITableProps {
    url?: string,
    data?: any[],
    search?: 'global' | boolean,
    sorting?: SortingModes | keyof typeof SortingModes,
    fields: string[],
    headers: IHeaderProp[],
    pageSize?: number
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
    currentPage: number,
    pagination: ReactPaginateProps;
}
