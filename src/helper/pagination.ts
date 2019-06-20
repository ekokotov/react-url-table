import {IPaginateProps, IRecord} from "../@typings/types";

export function paginate<T>(array: T[], page_size: number, page_number: number): T[] {
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

export function calculatePageCount(array: IRecord[], paginationOptions?: IPaginateProps | false): number {
    if (!paginationOptions) {
        return 1;
    }
    return paginationOptions.pageCount ||
        paginationOptions.pageSize && Math.round(array.length / paginationOptions.pageSize) || 1;
}
