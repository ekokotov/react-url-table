import {mount} from 'enzyme';
import React from 'react';
import UrlTable from "../../src";
import {data} from '../mocks/mock.json';

describe('Simple example with local data and paging', () => {
    it('Component should render with header', () => {
        const table = mount(
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
                headers={['Name', 'Address']}
            />
        );
        const renderedHeader = table.find('thead th');

        expect(renderedHeader.first().text()).toEqual('Name');
        expect(renderedHeader.last().text()).toEqual('Address');
    });

    it('should render local data without header', () => {
        const table = mount(
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
            />
        );

        expect(table.find('thead th').exists()).toEqual(false);
    });

    it('should render local data with body', () => {
        const table = mount(
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
                headers={['Name', 'Address']}
            />
        );

        expect(table.find('tbody td').first().text()).toEqual(data[0].name);
    });

    it('should render cell with dot pattern (property1.property2)', () => {
        const table = mount(
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address', 'friends[0].name']}
                headers={['Name', 'Address', 'Friend']}
            />
        );

        expect(table.find('tbody tr').first().find('td').last().text()).toEqual(data[0].friends[0].name);
    });

    it('should show working paging', async () => {
        const PAGE_SIZE = 5;
        const calculatedPageCount = Math.round(data.length / PAGE_SIZE);
        const table = mount(
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
                headers={['Name', 'Address']}
                pagination={{
                    pageSize: PAGE_SIZE,
                    pageRangeDisplayed: calculatedPageCount
                }}
            />
        );

        expect(table.find('.table__pagination li').length).toEqual(calculatedPageCount + 2); // for prev and next

        expect(table.find('.table__pagination li.selected').text()).toEqual('1');
        table.find('.table__pagination li a').last().simulate('click');
        await table.update();
        expect(table.find('.table__pagination li.selected').text()).toEqual('2');
    });

    it('should hide paging with pagination={false}', () => {
        const table = mount(
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
                headers={['Name', 'Address']}
                pagination={false}
            />
        );
        expect(table.find('.table__pagination').exists()).toEqual(false);
    });

    it('should hide paging with empty pagination', () => {
        const table = mount(
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
                headers={['Name', 'Address']}
            />
        );
        expect(table.find('.table__pagination').exists()).toEqual(false);
    });

    it('should show only specified number of pages even if have more data (pageCount={N})', () => {
        const PAGE_SIZE = 5;
        const PAGE_COUNT = 2;
        const table = mount(
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
                headers={['Name', 'Address']}
                pagination={{
                    pageSize: PAGE_SIZE,
                    pageCount: PAGE_COUNT
                }}
            />
        );
        expect(table.find('.table__pagination li').length).toEqual(PAGE_COUNT + 2); // for prev and next
    });

});
