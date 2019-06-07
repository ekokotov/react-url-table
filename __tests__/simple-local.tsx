import 'jsdom-global/register';
import {shallow, mount, render} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import waitUntil from 'async-wait-until';
// import nock from 'nock';
import React from 'react';
import UrlTable from "../src";
import {data} from './mock.json';

// automatically unmount and cleanup DOM after the test is finished.
Enzyme.configure({adapter: new Adapter()});
describe('Simple example with local data and paging', () => {
    let table: any;
    beforeAll(() => {
        // Prepare nock to respond to a request
        // to the weather API.
        // In this case our test will always think that london
        // is sunny.
        // nock('https://weather.example.com/api')
        //   .get('/weather?q=london')
        //   .reply(200, {
        //     summary: 'sunny',
        //   });
        table = mount(
            <UrlTable
                data={data} uniqProp={'_id'}
                fields={['name', 'address']}
                headers={['Name', 'Address']}
                pagination={{
                    serverPaging: false,
                    pageSize: 5,
                    pageCount: 3,
                    currentPage: 0,
                    pageRangeDisplayed: 0,
                    marginPagesDisplayed: 2
                }}
            />
        );
    });

    it('Component should render with Header', async (done) => {

        const renderedHeader = table.find('thead th');
        expect(renderedHeader.first().text()).toEqual('Name');
        expect(renderedHeader.last().text()).toEqual('Address');
        done();
    });

    it('should render with body', async (done) => {
        expect(table.find('tbody td').first().text()).toEqual('Donovan');
        expect(table.find('tbody td').first().text()).toEqual('Donovan');
        done();
    });

    it('should show working paging', async (done) => {
        // pagination
        expect(table.find('.table__pagination li').length).toEqual(5);
        expect(table.find('.table__pagination li').length).toEqual(5);
        expect(table.find('.table__pagination li.selected').text()).toEqual('1');
        table.find('.table__pagination li a').last().simulate('click');
        await waitUntil(() => table.update());
        expect(table.find('.table__pagination li.selected').text()).toEqual('2');
        done();
    });
});
