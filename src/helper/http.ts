/* global fetch */

export async function load<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return await response.json();
}
