import {mount} from 'enzyme';
import {data as dataMock} from '../mocks/mock.json';
import React from 'react';
import UrlTable from "../../src";
import {IRecord} from "../../src/@typings/types";

describe('Edit cell', () => {

    it('allow edit globally with (editable={true}))', async () => {
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
        const row = table.find('tbody tr td');

        expect(row.length > 0).toBe(true);
        expect(row.first().getDOMNode().getAttribute('contenteditable')).toEqual("true");
    });

    it('allow prevent to edit with global editable={true} and headers options editable={false})', async () => {
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

    it('change content by edit (editable={true}))', async () => {
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

        expect(mockEditCallback).toHaveBeenCalled();

        expect(mockEditCallback).toHaveBeenCalledWith("lorem", "name", dataMock[0]);
        expect(nameCell.text()).toBe("lorem");
        expect(dataMock[0].name).toBe("lorem");
    });

});
