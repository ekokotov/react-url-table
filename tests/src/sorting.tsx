import {mount} from 'enzyme';
import {data as mockData} from '../mocks/mock.json';
import _orderBy from 'lodash/orderBy';
import React from 'react';
import fetch from 'jest-fetch';
import UrlTable from "../../src";
import waitUntil from "async-wait-until";

describe('Rows selecting', () => {
    const sortedByNameMockDataAsc = _orderBy(mockData, ['name'], ['asc']);
    const sortedByNameMockDataDesc = _orderBy(mockData, ['name'], ['desc']);

    beforeEach(() => {
        fetch.resetMocks();
    });

    it('load By url and sort locally (sorting={"simple"}) without pagination', async () => {
        fetch.mockResponseOnce(`${[JSON.stringify(mockData)]}`);

        const table = mount(
            <UrlTable
                url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                pagination={false}
                indexField={'_id'}
            />
        );
        const loading = table.find('tbody .url_table__progress');

        expect(loading.exists()).toEqual(true);
        expect(loading.text()).toEqual('Loading...');

        await waitUntil(() => table.update());
        const body = table.find('table tbody');
        const thead = table.find('table thead');

        expect(body.find('tr').first().find('td').first().text()).toEqual(mockData[0].name);
        expect(body.find('tr').last().find('td').first().text()).toEqual(mockData[mockData.length - 1].name);
        const firstTh = thead.find('th').first();

        firstTh.simulate('click');

        await waitUntil(() => table.update());

        expect(firstTh.render().hasClass('url_table__header--sorted-asc')).toEqual(true);
        await waitUntil(() => table.update());
        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameMockDataAsc[0].name);

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameMockDataAsc[sortedByNameMockDataAsc.length - 1].name);

        firstTh.simulate('click');

        await waitUntil(() => table.update());

        expect(firstTh.render().hasClass('url_table__header--sorted-desc')).toEqual(true);
        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameMockDataDesc[0].name);

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameMockDataDesc[sortedByNameMockDataDesc.length - 1].name);
    });


    it('load By url and sort locally (sorting={"simple"}) with pagination', async () => {
        fetch.mockResponseOnce(`${[JSON.stringify(mockData)]}`);

        const pageSize = 5;
        const totalPages = Math.round(mockData.length / pageSize);
        const table = mount(
            <UrlTable
                url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                pagination={{
                    marginPagesDisplayed: 100,
                    pageSize
                }}
                indexField={'_id'}
            />
        );
        const loading = table.find('tbody .url_table__progress');

        expect(loading.exists()).toEqual(true);
        expect(loading.text()).toEqual('Loading...');

        await waitUntil(() => table.update());
        const thead = table.find('table thead');
        const paging = table.find('.url_table__pagination');

        expect(table.find('tbody tr').first().find('td').first().text()).toEqual(mockData[0].name);
        // return to last page and check last record name
        paging.find('li').at(totalPages).find('a').simulate('click');
        await waitUntil(() => table.update());

        expect(table.find('tbody tr').last().find('td').first().text()).toEqual(mockData[mockData.length - 1].name);

        const firstTh = thead.find('th').first();

        firstTh.simulate('click');
        await waitUntil(() => table.update());

        expect(paging.find('.url_table__pagination__page--selected').text()).toBe('1');
        expect(firstTh.render().hasClass('url_table__header--sorted-asc')).toEqual(true);
        await waitUntil(() => table.update());

        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameMockDataAsc[0].name);

        paging.find('li').at(totalPages).find('a').simulate('click');
        await waitUntil(() => table.update());

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameMockDataAsc[sortedByNameMockDataAsc.length - 1].name);

        firstTh.simulate('click');
        await waitUntil(() => table.update());

        expect(firstTh.render().hasClass('url_table__header--sorted-desc')).toEqual(true);
        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameMockDataDesc[0].name);

        paging.find('li').at(totalPages).find('a').simulate('click');

        await waitUntil(() => table.update());

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameMockDataDesc[sortedByNameMockDataDesc.length - 1].name);
    });


    it('sort locally (sorting={"compound"}) by 2 properties without pagination', async () => {
        const sortedByAgeMockDataAsc = _orderBy(mockData, ['age'], ['asc']);
        const sortedByNameAscAndAgeAscData = _orderBy(mockData, ['age', 'name'], ['asc', 'asc']);
        const sortedByNameDescandAgeAscData = _orderBy(mockData, ['age', 'name'], ['asc', 'desc']);

        const table = mount(
            <UrlTable
                data={mockData}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                pagination={false}
                sorting={'compound'}
                indexField={'_id'}
            />
        );

        const body = table.find('table tbody');
        const thead = table.find('table thead');

        expect(body.find('tr').first().find('td').first().text()).toEqual(mockData[0].name);
        expect(body.find('tr').last().find('td').first().text()).toEqual(mockData[mockData.length - 1].name);
        const nameHeader = thead.find('th').first();
        const ageHeader = thead.find('th').at(1);

        ageHeader.simulate('click');
        await waitUntil(() => table.update());

        expect(ageHeader.render().hasClass('url_table__header--sorted-asc')).toEqual(true);
        await waitUntil(() => table.update());

        expect(
            table.find('table tbody').find('tr').first().find('td').at(1).text()
        ).toEqual(sortedByAgeMockDataAsc[0].age.toString());

        expect(
            table.find('table tbody').find('tr').last().find('td').at(1).text()
        ).toEqual(sortedByAgeMockDataAsc[sortedByAgeMockDataAsc.length - 1].age.toString());

        nameHeader.simulate('click');
        await waitUntil(() => table.update());

        expect(nameHeader.render().hasClass('url_table__header--sorted-asc')).toEqual(true);

        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameAscAndAgeAscData[0].name);

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameAscAndAgeAscData[sortedByNameAscAndAgeAscData.length - 1].name);

        nameHeader.simulate('click');
        await waitUntil(() => table.update());

        expect(nameHeader.render().hasClass('url_table__header--sorted-desc')).toEqual(true);

        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameDescandAgeAscData[0].name);

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameDescandAgeAscData[sortedByNameDescandAgeAscData.length - 1].name);

        expect(
            table.find('table tbody').find('tr').first().find('td').at(1).text()
        ).toEqual(sortedByAgeMockDataAsc[0].age.toString());

        expect(
            table.find('table tbody').find('tr').last().find('td').at(1).text()
        ).toEqual(sortedByAgeMockDataAsc[sortedByAgeMockDataAsc.length - 1].age.toString());
    });

    it('lock few fields of sorting (sorting={"simple"}) ', async () => {
        const sortedByNameDataAsc = _orderBy(mockData, ['name'], ['asc']);
        const headers = [
            {name: 'Name'},
            {name: 'Age', sortable: false}
        ];
        const table = mount(
            <UrlTable
                data={mockData}
                headers={headers}
                fields={['name', 'age']}
                pagination={false}
                indexField={'_id'}
            />
        );

        const body = table.find('table tbody');
        const thead = table.find('table thead');

        expect(body.find('tr').first().find('td').first().text()).toEqual(mockData[0].name);
        expect(body.find('tr').last().find('td').first().text()).toEqual(mockData[mockData.length - 1].name);

        const nameHeader = thead.find('th').first();
        const ageHeader = thead.find('th').at(1);

        nameHeader.simulate('click');
        await waitUntil(() => table.update());

        expect(nameHeader.render().hasClass('url_table__header--sorted-asc')).toEqual(true);
        await waitUntil(() => table.update());

        expect(
            table.find('table tbody').find('tr').first().find('td').first().text()
        ).toEqual(sortedByNameDataAsc[0].name);

        expect(
            table.find('table tbody').find('tr').last().find('td').first().text()
        ).toEqual(sortedByNameDataAsc[sortedByNameDataAsc.length - 1].name);
        const prevBody = table.find('tbody').html();

        ageHeader.simulate('click');
        await waitUntil(() => table.update());

        expect(ageHeader.render().hasClass('url_table__header--sorted-asc')).toEqual(false);
        expect(table.find('tbody').html()).toEqual(prevBody)
    });

    it('show sorting panel badges and react to table sorting', async () => {
        const table = mount(
            <UrlTable
                data={mockData}
                headers={['Name', 'Age']}
                fields={['name', 'age']}
                pagination={false}
                indexField={'_id'}
            />
        );

        const nameHeader = table.find('.url_table__header').first();

        nameHeader.simulate('click');
        await waitUntil(() => table.update());

        expect(nameHeader.render().hasClass('url_table__header--sorted-asc')).toEqual(true);
        const sortingPanel = table.find('.url_table__sorting_panel');

        expect(sortingPanel.exists()).toEqual(true);
        const badge = sortingPanel.find('.url_table__sorting_panel__badge');

        expect(badge.length).toBe(1);
        expect(badge.render().hasClass('url_table__sorting_panel__badge--asc')).toBe(true);

        nameHeader.simulate('click');
        await waitUntil(() => table.update());

        expect(badge.length).toBe(1);
        expect(badge.render().hasClass('url_table__sorting_panel__badge--desc')).toBe(true);
    });


    it('sorting using sorting badge table should react sorting (sorting ={compound})', async () => {
        let sortingPanel, badges;
        const table = mount(
            <UrlTable
                data={mockData}
                headers={['Name', 'Age']}
                fields={['name', 'age']}
                sorting={'compound'}
                indexField={'_id'}
            />
        );

        const thead = table.find('table thead');

        const nameHeader = thead.find('th').first();
        const ageHeader = thead.find('th').last();

        ageHeader.simulate('click');
        await waitUntil(() => table.update());

        expect(ageHeader.render().hasClass('url_table__header--sorted-asc')).toEqual(true);
        sortingPanel = table.find('.url_table__sorting_panel');

        expect(sortingPanel.exists()).toEqual(true);
        badges = sortingPanel.find('.url_table__sorting_panel__badge');

        expect(badges.length).toBe(1);
        expect(badges.render().hasClass('url_table__sorting_panel__badge--asc')).toBe(true);

        ageHeader.simulate('click');
        await waitUntil(() => table.update());

        expect(ageHeader.render().hasClass('url_table__header--sorted-desc')).toEqual(true);

        nameHeader.simulate('click');
        await waitUntil(() => table.update());

        sortingPanel = table.find('.url_table__sorting_panel');
        badges = sortingPanel.find('.url_table__sorting_panel__badge');

        expect(badges.length).toBe(2);
        expect(badges.first().render().hasClass('url_table__sorting_panel__badge--desc')).toBe(true);
        expect(badges.last().render().hasClass('url_table__sorting_panel__badge--asc')).toBe(true);
    });

    it('remove sorting sorting using sorting badge table should react sorting (sorting ={compound})', async () => {
        let sortingPanel, badges, removeSortingBtn;
        const table = mount(
            <UrlTable
                data={mockData}
                headers={['Name', 'Age']}
                fields={['name', 'age']}
                sorting={'compound'}
                indexField={'_id'}
            />
        );

        const thead = table.find('table thead');

        const nameHeader = thead.find('th').first();
        const ageHeader = thead.find('th').last();

        ageHeader.simulate('click');
        await waitUntil(() => table.update());

        sortingPanel = table.find('.url_table__sorting_panel');
        badges = sortingPanel.find('.url_table__sorting_panel__badge');
        expect(badges.length).toBe(1);

        nameHeader.simulate('click');
        await waitUntil(() => table.update());

        sortingPanel = table.find('.url_table__sorting_panel');
        badges = sortingPanel.find('.url_table__sorting_panel__badge');
        expect(badges.length).toBe(2);

        removeSortingBtn = badges.find('.url_table__sorting_panel__badge__close').first();
        removeSortingBtn.simulate('click');
        await waitUntil(() => table.update());

        sortingPanel = table.find('.url_table__sorting_panel');
        badges = sortingPanel.find('.url_table__sorting_panel__badge');
        removeSortingBtn = badges.find('.url_table__sorting_panel__badge__close').first();
        expect(sortingPanel.find('.url_table__sorting_panel__badge').length).toBe(1);

        removeSortingBtn.simulate('click');
        await waitUntil(() => table.update());
        sortingPanel = table.find('.url_table__sorting_panel');
        expect(sortingPanel.find('.url_table__sorting_panel__badge').length).toBe(0);
    });

    it('don\'t show sorting panel with sorting={"false"}', async () => {
        const table = mount(
            <UrlTable
                data={mockData}
                headers={['Name', 'Age']}
                fields={['name', 'age']}
                sorting={false}
                indexField={'_id'}
            />
        );
        const thead = table.find('table thead');
        const nameHeader = thead.find('th').first();

        nameHeader.simulate('click');
        await waitUntil(() => table.update());

        const sortingPanel = table.find('.url_table__sorting_panel');
        expect(sortingPanel.exists()).toEqual(false);
    });

    it('don\'t show sorting panel with sortingPanel={"false"}', async () => {
        const table = mount(
            <UrlTable
                data={mockData}
                headers={['Name', 'Age']}
                fields={['name', 'age']}
                showSortingPanel={false}
                indexField={'_id'}
            />
        );
        const thead = table.find('table thead');
        const nameHeader = thead.find('th').first();

        nameHeader.simulate('click');
        await waitUntil(() => table.update());

        const sortingPanel = table.find('.url_table__sorting_panel');
        expect(sortingPanel.exists()).toEqual(false);
    });
});
