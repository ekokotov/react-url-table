import {mount} from 'enzyme';
import page1 from '../mocks/page1.json';
import {data as mockData} from '../mocks/mock.json';
import React from 'react';
import UrlTable from "../../src";
import waitUntil from "async-wait-until";
import fetch from 'jest-fetch';

describe('Simple load table by URL', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('Component should render with paging', async () => {
        fetch.mockResponse(`${[JSON.stringify(mockData)]}`);

        const PAGE_SIZE = 5;
        const table = mount(
            <UrlTable
                url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                pagination={{
                    pageSize: PAGE_SIZE
                }}
                indexField={'_id'}
            />
        );
        const renderedHeader = table.find('thead th');

        expect(renderedHeader.first().text()).toEqual('Name');
        expect(renderedHeader.last().text()).toEqual('Favorite fruit');

        await waitUntil(() => table.update());

        expect(table.find('.table__pagination li').length > 3).toEqual(true);
        expect(table.find('tbody tr').length).toEqual(PAGE_SIZE);
    });

    it('Component should render without paging (empty pagination)', async () => {
        fetch.mockResponseOnce(`${[JSON.stringify(mockData)]}`);

        const table = mount(
            <UrlTable
                url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                indexField={'_id'}
                pagination={false}
            />
        );
        const renderedHeader = table.find('thead th');

        expect(renderedHeader.first().text()).toEqual('Name');
        expect(renderedHeader.last().text()).toEqual('Favorite fruit');

        await waitUntil(() => table.update());
        expect(table.find('.table__pagination').exists()).toEqual(false);
        expect(table.find('tbody tr').length > 1).toEqual(true);
    });

    it('Component should render with specified data-mapper(fetchSuccess)', async () => {
        fetch.mockResponseOnce(`${[JSON.stringify(page1)]}`);

        const table = mount(
            <UrlTable
                url="https://reqres.in/api/users?page=1&per_page=5"
                fetchSuccess={(res: any): [] => res.data}
                headers={['Email', 'First name', 'Last name']}
                fields={['email', 'first_name', 'last_name']}
                indexField={'id'}
            />
        );
        const renderedHeader = table.find('thead th');

        expect(renderedHeader.first().text()).toEqual('Email');
        expect(renderedHeader.last().text()).toEqual('Last name');

        await waitUntil(() => table.update());

        expect(table.find('.table__pagination').exists()).toEqual(false);
        expect(table.find('tbody tr').length > 1).toEqual(true);
    });

    it('should show progress component while data loading', async () => {
        fetch.mockResponseOnce(`${[JSON.stringify(page1)]}`);

        const table = mount(
            <UrlTable
                url="https://reqres.in/api/users?page=1&per_page=5"
                fetchSuccess={(res: any): [] => res.data}
                headers={['Email', 'First name', 'Last name']}
                fields={['email', 'first_name', 'last_name']}
                indexField={'id'}
                pagination={{
                    pageSize: 2
                }}
            />
        );
        const loading = table.find('tbody .table__progress');

        expect(loading.exists()).toEqual(true);
        expect(loading.text()).toEqual('Loading...');
        expect(table.find('.table__pagination').exists()).toEqual(false);

        await waitUntil(() => table.update());

        expect(table.find('.table__pagination').exists()).toEqual(true);
        expect(table.find('tbody tr').length > 1).toEqual(true);
        expect(table.find('tbody .table__progress').exists()).toEqual(false);
    });

    it('should show custom progress component while data loading', async () => {
        fetch.mockResponseOnce(`${[JSON.stringify(page1)]}`);

        const table = mount(
            <UrlTable
                url="https://reqres.in/api/users?page=1&per_page=5"
                loadingComponent={
                    (isLoading) => <div>loading: <mark>{isLoading && isLoading.toString()}</mark></div>}
                fetchSuccess={(res: any): [] => res.data}
                headers={['Email', 'First name', 'Last name']}
                fields={['email', 'first_name', 'last_name']}
                indexField={'id'}
            />
        );
        const loading = table.find('tbody .table__progress');

        expect(loading.exists()).toEqual(true);
        expect(loading.text()).toEqual('loading: true');
        expect(table.find('.table__pagination').exists()).toEqual(false);

        await waitUntil(() => table.update());

        expect(table.find('tbody tr').length > 1).toEqual(true);
        expect(table.find('tbody .table__progress').exists()).toEqual(false);
    });

});
