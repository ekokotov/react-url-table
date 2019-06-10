import {render} from 'react-dom';
import waitUntil from 'async-wait-until';
import page1 from '../mocks/page1.json';
import page2 from '../mocks/page2.json';
import {act} from 'react-dom/test-utils';
import fetch from 'jest-fetch-mock';
import React, {useEffect, useState} from "react";
import {load} from "../../src/helper/http";
import UrlTable from "../../src";

const DEFAULT_PAGE_SIZE = 5;

function TableWithServerPaging(): React.ReactElement {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(
        () => {
            load(`https://reqres.in/api/users?page=${page}&per_page=${pageSize}`)
                .then((res: any) => {
                    setData(res.data);
                    setTotalPages(res.total_pages);
                });
        }, [page]
    );
    return (
        <UrlTable
            data={data}
            fields={['first_name', 'last_name', 'email', 'avatar']}
            headers={['First name', 'Last name', 'Email', 'Avatar']}
            pagination={{
                serverPaging: true,
                currentPage: page,
                pageSize: pageSize,
                pageCount: totalPages, // u can don't specify this thing
                pageRangeDisplayed: 0,
                marginPagesDisplayed: 2,
                onPageChange: (page: { selected: number }): void => {
                    setPage(page.selected + 1);
                }
            }}
            uniqProp={'email'}
        />
    )
}

describe('Example of controlled server paging', () => {
    let container: any;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        global.fetch.resetMocks()
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });


    it('Component should render with header', async () => {
        global.fetch.mockResponses([JSON.stringify(page1), { status: 200}], [JSON.stringify(page2), { status: 200}]);

        act(() => {
            render(<TableWithServerPaging/>, container);
        });

        const renderedHeader = container.querySelectorAll('thead th');
        const body = container.querySelector('tbody');
        const paging = container.querySelector('.table__pagination ul');

        expect(body.innerHTML).toBe('');

        expect(renderedHeader[0].textContent).toEqual('First name');
        expect(renderedHeader[renderedHeader.length - 1].textContent).toEqual('Avatar');

        await waitUntil(() => body.innerHTML !== '');

        expect(paging.querySelectorAll('li').length).toBe(page1.total_pages + 2);
        expect(paging.querySelector('li.selected').textContent).toBe('1');
        expect(body.querySelectorAll('tr').length).toBe(DEFAULT_PAGE_SIZE);
        expect(body.querySelector('td').textContent).toContain('George');

        const prevHTML = container.innerHTML;

        act(() => {
            paging.querySelector('li.selected')
                .nextSibling.querySelector('a')
                .dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });

        // wait until next render
        await waitUntil(() => container.innerHTML !== prevHTML);

        expect(paging.querySelector('li.selected').textContent).toBe('2');
        expect(body.querySelector('td').textContent).toContain('Tracey');
    });
});
