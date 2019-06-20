import {mount} from 'enzyme';
import {data} from '../mocks/mock.json';
import React from 'react';
import UrlTable from "../../src";

describe('search', () => {

    it('show single-row row selecting (selectMode={"single"})', async () => {
        const table = mount(
            <UrlTable
                data={data}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                uniqProp={'_id'}
            />
        );

        const input = table.find('input.table__search__input');
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

});
