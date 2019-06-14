import {mount} from 'enzyme';
import {data as mockData} from '../mocks/mock.json';
import _orderBy from 'lodash/orderBy';
import React, {Fragment} from 'react';
import fetch from 'jest-fetch-mock';
import UrlTable from "../../src";
import waitUntil from "async-wait-until";

describe('Rows selecting', () => {
    const sortedByNameMockDataAsc = _orderBy(mockData, ['name'], ['asc']);
    const sortedByNameMockDataDesc = _orderBy(mockData, ['name'], ['desc']);

    beforeEach(() => {
        global.fetch.resetMocks();
    });

    it('load By url and sort locally (sorting={"simple"}) without pagination', async () => {
        global.fetch.mockResponses([JSON.stringify(mockData), {status: 200}]);

        const table = mount(
            <UrlTable
                url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                pagination={false}
                uniqProp={'_id'}
            />
        );
        const loading = table.find('tbody .table__progress');

        expect(loading.exists()).toEqual(true);
        expect(loading.text()).toEqual('Loading...');

        await waitUntil(() => table.update());
        const body = table.find('table tbody');
        const thead = table.find('table thead');

        expect(body.find('tr').first().find('td').first().text()).toEqual(mockData[0].name);
        expect(body.find('tr').last().find('td').first().text()).toEqual(mockData[mockData.length - 1].name);
        const firstTh = thead.find('th').first();

        firstTh.simulate('click');

        await table.update();

        expect(firstTh.render().hasClass('header__sorted--asc')).toEqual(true);
        await table.update();
        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameMockDataAsc[0].name);

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameMockDataAsc[sortedByNameMockDataAsc.length - 1].name);

        firstTh.simulate('click');

        await table.update();

        expect(firstTh.render().hasClass('header__sorted--desc')).toEqual(true);
        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameMockDataDesc[0].name);

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameMockDataDesc[sortedByNameMockDataDesc.length - 1].name);
    });


    it('load By url and sort locally (sorting={"simple"}) with pagination', async () => {
        global.fetch.mockResponses([JSON.stringify(mockData), {status: 200}]);
        const pageSize = 5;
        const totalPages = Math.round(mockData.length / pageSize);
        const table = mount(
            <UrlTable
                url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                pagination={{
                    pageSize: pageSize,
                    marginPagesDisplayed: 100
                }}
                uniqProp={'_id'}
            />
        );
        const loading = table.find('tbody .table__progress');

        expect(loading.exists()).toEqual(true);
        expect(loading.text()).toEqual('Loading...');

        await waitUntil(() => table.update());
        const thead = table.find('table thead');
        const paging = table.find('.table__pagination ul');

        expect(table.find('tbody tr').first().find('td').first().text()).toEqual(mockData[0].name);
        // return to last page and check last record name
        paging.find('li').at(totalPages).find('a').simulate('click');
        await waitUntil(() => table.update());

        expect(table.find('tbody tr').last().find('td').first().text()).toEqual(mockData[mockData.length - 1].name);

        const firstTh = thead.find('th').first();

        firstTh.simulate('click');
        await table.update();

        expect(paging.find('li.selected').text()).toBe('1');
        expect(firstTh.render().hasClass('header__sorted--asc')).toEqual(true);
        expect(firstTh.render().hasClass('header__sorted--asc')).toEqual(true);
        await table.update();

        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameMockDataAsc[0].name);

        paging.find('li').at(totalPages).find('a').simulate('click');
        await waitUntil(() => table.update());

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameMockDataAsc[sortedByNameMockDataAsc.length - 1].name);

        firstTh.simulate('click');
        await table.update();

        expect(firstTh.render().hasClass('header__sorted--desc')).toEqual(true);
        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameMockDataDesc[0].name);

        paging.find('li').at(totalPages).find('a').simulate('click');

        await waitUntil(() => table.update());

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameMockDataDesc[sortedByNameMockDataDesc.length - 1].name);
    });
});
