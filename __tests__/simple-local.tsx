import {mount, render} from 'enzyme';
import waitUntil from "async-wait-until";
// import nock from 'nock';
import React from 'react';
import UrlTable from "../src";
import {data} from './mock.json';
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// automatically unmount and cleanup DOM after the test is finished.
Enzyme.configure({ adapter: new Adapter() });

describe('Simple example with local data and paging', () => {

    it('Component should render with header', (done) => {
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
        done();
    });

    it('should render local data without header', (done) => {
        const table = mount(
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
            />
        );

        expect(table.find('thead th').exists()).toEqual(false);
        done();
    });

    it('should render local data with body', (done) => {
        const table = mount(
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
                headers={['Name', 'Address']}
            />
        );

        expect(table.find('tbody td').first().text()).toEqual(data[0].name);
        done();
    });

    it('should show working paging', async (done) => {
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
        await waitUntil(() => table.update());
        expect(table.find('.table__pagination li.selected').text()).toEqual('2');
        done();
    });

    it('should hide paging with pagination={false}', (done) => {
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
        done();
    });

    it('should show only specified number of pages even if have more data (pageCount={N})', (done) => {
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
        done();
    });

});
