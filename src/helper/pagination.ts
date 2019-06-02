export function paginate<T>(array: T[], page_size: number, page_number: number): T[] {
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
}
