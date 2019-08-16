import {mount} from 'enzyme';
import {data as dataMock} from '../mocks/mock.json';
import React from 'react';
import UrlTable from "../../src";
import {act} from "react-dom/test-utils";
import {render} from "react-dom";
import waitUntil from "async-wait-until";

describe('search', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });
    it('show search input with (search={false}))', async () => {
       act(()=> {
           render(
               <UrlTable
                   data={dataMock}
                   headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                   fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                   selectMode={'single'}
                   search={true}
                   indexField={'_id'}
               />, container
           )});

        const input = container.querySelector('.url_table__search__input');
        expect(input).toBeDefined();

        act(() => {
            input.nodeValue = 'test';
        });
        act(() => {
            input.dispatchEvent(new MouseEvent('blur', {bubbles: true}));
        });
        // expect(container.querySelectorAll('table tbody tr').length).toEqual(2);
    });

    it('show search input with (search={global}))', async () => {
        const table = mount(
            <UrlTable
                data={dataMock}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                search={true}
                indexField={'_id'}
            />
        );

        expect(table.find('.url_table__search__input').exists()).toEqual(true);
    });

});
