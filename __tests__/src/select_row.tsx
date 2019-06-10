import {mount} from 'enzyme';
import {data} from '../mocks/mock.json';
import React from 'react';
import UrlTable from "../../src";

describe('Rows selecting', () => {
    let selectedRows = [];

    afterEach(() => {
        selectedRows = [];
    });

    const onSelect = jest.fn((records: any[]) => {
        // console.log('Selected records: ', records);
        selectedRows = records;
    });

    it('show single-row row selecting (selectMode={"single"})', async () => {
        const table = mount(
            <UrlTable
                data={data}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                onSelect={onSelect}
                uniqProp={'_id'}
            />
        );

        table.find('tbody tr').first().simulate('click');
        await table.update();
        expect(table.find('tbody tr.selected').length).toEqual(1);
        expect(onSelect).toHaveBeenCalled();
        expect(selectedRows.length).toEqual(1);
    });

    it('no row selecting (without selectMode={})', async () => {
        const table = mount(
            <UrlTable
                data={data}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                uniqProp={'_id'}
            />
        );

        table.find('tbody tr').first().simulate('click');
        await table.update();
        expect(table.find('tbody tr.selected').length).toEqual(0);
        expect(selectedRows.length).toEqual(0);
    });

    it('no row selecting (without selectMode={"multiple"})', async () => {
        const table = mount(
            <UrlTable
                data={data}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'multiple'}
                onSelect={onSelect}
                uniqProp={'_id'}
            />
        );

        table.find('tbody tr').first().simulate('click');
        table.find('tbody tr').last().simulate('click');
        await table.update();
        expect(table.find('tbody tr.selected').length).toEqual(2);
        expect(onSelect).toHaveBeenCalledTimes(2);
        expect(selectedRows.length).toEqual(2);
    });
});
