import {mount} from 'enzyme';
import {data} from '../mocks/mock.json';
import React from 'react';
import UrlTable from "../../src";
import {IRecord} from "../../src/@typings/types";
const mockData = data as IRecord[];
describe('Rows selecting', () => {
    let selectedRows: IRecord[] = [];

    afterEach(() => {
        selectedRows = [];
    });

    const onSelect = jest.fn((records: IRecord[]) => {
        // console.log('Selected records: ', records);
        selectedRows = records;
    });

    it('show single-row row selecting (selectMode={"single"})', async () => {
        const table = mount(
            <UrlTable
                data={mockData}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                onSelect={onSelect}
                indexField={'_id'}
            />
        );

        table.find('tbody tr').first().simulate('click');
        await table.update();
        expect(table.find('tbody tr.url_table__row--selected').length).toEqual(1);
        expect(onSelect).toHaveBeenCalled();
        expect(selectedRows.length).toEqual(1);
    });

    it('no row selecting (without selectMode={})', async () => {
        const table = mount(
            <UrlTable
                data={mockData}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                indexField={'_id'}
            />
        );

        table.find('tbody tr').first().simulate('click');
        await table.update();
        expect(table.find('tbody tr.url_table__row--selected').length).toEqual(0);
        expect(selectedRows.length).toEqual(0);
    });

    it('no row selecting (without selectMode={"multiple"})', async () => {
        const table = mount(
            <UrlTable
                data={mockData}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'multiple'}
                onSelect={onSelect}
                indexField={'_id'}
            />
        );

        table.find('tbody tr').first().simulate('click');
        table.find('tbody tr').last().simulate('click');
        await table.update();
        expect(table.find('tbody tr.url_table__row--selected').length).toEqual(2);
        expect(onSelect).toHaveBeenCalledTimes(2);
        expect(selectedRows.length).toEqual(2);
    });
});
