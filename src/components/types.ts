import {ReactPaginateProps} from "react-paginate";

export interface IHeaderProp {
    name: string,
    render? (name: string): string
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
    pagination?: ReactPaginateProps
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
