import {mount} from 'enzyme';
import {data as dataMock} from '../mocks/mock.json';
import React from 'react';
import UrlTable from "../../src";
// import waitUntil from "async-wait-until";

describe('search', () => {

    it('show search input with (search={false}))', async () => {
        const table = mount(
            <UrlTable
                data={dataMock}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                search={true}
                uniqProp={'_id'}
            />
        );
        const input = table.find('input.table__search__input');
        expect(input.exists()).toEqual(true);
        // input.simulate('click');
        // input.simulate('change', {value: "Do"});
        // input.simulate('blur');
        // await waitUntil(() => table.find('tbody tr').length < 10);
        // expect(table.find('tbody tr').length).toEqual(2);
    });

    it('show search input with (search={global}))', async () => {
        const table = mount(
            <UrlTable
                data={dataMock}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                search={true}
                uniqProp={'_id'}
            />
        );

        expect(table.find('input.table__search__input').exists()).toEqual(true);
    });

});
