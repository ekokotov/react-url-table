import {data as dataMock} from '../mocks/mock.json';
import React from 'react';
import UrlTable from "../../src";
import {IRecord} from "../../src/@typings/types";
import {act} from "react-dom/test-utils";
import {render} from "react-dom";

describe('Editable cells', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });
    it('allow edit globally with (editable={true}))', async () => {
        act(() => {
            render(
                <UrlTable
                    data={dataMock}
                    editable={true}
                    headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                    selectMode={'single'}
                    search={true}
                    indexField={'_id'}
                />, container
            );
        });

        const cells = container.querySelectorAll('tbody tr td');
        const cell = container.querySelector('tbody tr td');

        expect(cells.length > 0).toBe(true);
        act(() => {
            cell.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });

        expect(cell.classList.contains('url_table__row__cell--focus')).toEqual(true);

        act(() => {
            cell.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(cell.getAttribute('contenteditable')).toEqual("true");
        expect(cell.classList.contains('url_table__row__cell--edit')).toEqual(true);
    });

    it('allow prevent to edit with global editable={true} and headers options editable={false})', () => {
        const mockEditCallback = jest.fn(() => {
        });
        act(() => {
            render(
                <UrlTable
                    data={dataMock}
                    editable={true}
                    onEdit={mockEditCallback}
                    headers={['Name', {name: 'Age', editable: false}, 'Eyes', 'Phone', 'Favorite fruit']}
                    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                    selectMode={'single'}
                    search={true}
                    indexField={'_id'}
                />, container
            );
        });
        const cells = container.querySelectorAll('tbody tr:first-child td');

        expect(cells.length > 0).toBe(true);
        let nameCell = cells[0];

        act(() => {
            nameCell.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });
        act(() => {
            nameCell.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });
        // Name cell
        expect(nameCell.getAttribute('contenteditable')).toEqual("true");

        // Age cell
        act(() => {
            cells[1].dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });
        act(() => {
            cells[1].dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(cells[1].getAttribute('contenteditable')).toEqual(null);

        nameCell.textContent = 'lorem';
        act(() => {
            nameCell.dispatchEvent(new MouseEvent('blur', {bubbles: true}));
        });

        expect(mockEditCallback).toHaveBeenCalledTimes(1);
        //
        nameCell = cells[1];
        nameCell.textContent = 'lorem';

        act(() => {
            nameCell.dispatchEvent(new MouseEvent('blur', {bubbles: true}));
        });

        expect(mockEditCallback).toHaveBeenCalledTimes(1);
    });

    it('change content by edit (editable={true}))', () => {
        const mockEditCallback = jest.fn((newValue: string | null, propertyName: string, record: IRecord) => {
        });
        const newContent = 'lorem'

        act(() => {
            render(
                <UrlTable
                    data={dataMock}
                    editable={true}
                    onEdit={mockEditCallback}
                    headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
                    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
                    selectMode={'single'}
                    search={true}
                    indexField={'_id'}
                />, container
            );
        });
        const nameCell = container.querySelector('tbody td:first-child');

        act(() => {
            nameCell.textContent = newContent;
            nameCell.dispatchEvent(new MouseEvent('blur', {bubbles: true}));
        });

        expect(nameCell.textContent).toBe(newContent);
        expect(dataMock[0].name).toBe(newContent);
    });

});
