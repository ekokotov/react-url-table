import {mount} from 'enzyme';
import {data as dataMock} from '../mocks/mock.json';
import React from 'react';
import UrlTable from "../../src";
import {IRecord} from "../../src/@typings/types";

describe('Editable cells', () => {

    it('allow edit globally with (editable={true}))', () => {
        const table = mount(
            <UrlTable
                data={dataMock}
                editable={true}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                search={true}
                indexField={'_id'}
            />
        );
        const cell = table.find('tbody tr td');

        expect(cell.length > 0).toBe(true);
        cell.first().simulate('click');
        expect(cell.first().render().hasClass('url_table__row__cell--focus')).toEqual(true);
        cell.first().simulate('click');
        expect(cell.first().getDOMNode().getAttribute('contenteditable')).toEqual("true");
        expect(cell.first().render().hasClass('url_table__row__cell--edit')).toEqual(true);
    });

    it('allow prevent to edit with global editable={true} and headers options editable={false})', () => {
        const mockEditCallback = jest.fn(() => {
        });
        const table = mount(
            <UrlTable
                data={dataMock}
                editable={true}
                onEdit={mockEditCallback}
                headers={['Name', {name: 'Age', editable: false}, 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                search={true}
                indexField={'_id'}
            />
        );
        const row = table.find('tbody tr:first-child td');

        expect(row.length > 0).toBe(true);

        row.at(0).simulate('click');
        row.at(0).simulate('click');
        // Name cell
        expect(row.at(0).getDOMNode().getAttribute('contenteditable')).toEqual("true");
        // Age cell
        expect(row.at(1).getDOMNode().getAttribute('contenteditable')).toEqual(null);

        let nameCell = row.at(0);
        nameCell.getDOMNode().textContent = 'lorem';
        nameCell.simulate('blur');

        expect(mockEditCallback).toHaveBeenCalledTimes(1);

        nameCell = row.at(1);
        nameCell.getDOMNode().textContent = 'lorem';
        nameCell.simulate('blur');

        expect(mockEditCallback).toHaveBeenCalledTimes(1);
    });

    it('change content by edit (editable={true}))', () => {
        const mockEditCallback = jest.fn((newValue: string | null, propertyName: string, record: IRecord) => {
        });

        const table = mount(
            <UrlTable
                data={dataMock}
                editable={true}
                onEdit={mockEditCallback}
                headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                selectMode={'single'}
                search={true}
                indexField={'_id'}
            />
        );
        const row = table.find('tbody tr td:first-child');
        const nameCell = row.first();
        nameCell.getDOMNode().textContent = 'lorem';
        nameCell.simulate('blur');

        expect(nameCell.text()).toBe("lorem");
        expect(dataMock[0].name).toBe("lorem");
    });

});
