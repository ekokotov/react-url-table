import {mount} from 'enzyme';
import {data as dataMock} from '../mocks/mock.json';
import React from 'react';
import UrlTable from "../../src";

describe('search', () => {

    it('show search input with (search={global}))', async () => {
        const table = mount(
            <UrlTable
                data={dataMock}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                search={false}
                uniqProp={'_id'}
            />
        );

        expect(table.find('input.table__search__input').exists()).toEqual(false);
        // input.simulate('focus');
        // input.simulate('change', {target: {value: "Do"}});
        // input.simulate('blur');
        // await table.update();

        // console.log(table.html())
        // await table.update();
        // await table.update();
        // await input.update();
        // expect(table.find('tbody tr').length).toEqual(2);
    });

    it('show search input with (search={global}))', async () => {
        const table = mount(
            <UrlTable
                data={dataMock}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                search={'global'}
                uniqProp={'_id'}
            />
        );

        expect(table.find('input.table__search__input').exists()).toEqual(true);
    });

});
