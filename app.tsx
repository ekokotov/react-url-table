import React from "react";
import {render} from 'react-dom';
import UrlTable from "./src";
import {data} from './mock.json';

const headers = [
    {
        name: 'Name',
        render: (title: string) => `#${title}`
    }, {
        name: 'Age'
    }, {
        name: 'Eyes'
    }, {
        name: 'Phone'
    }, {
        name: 'Favorite fruit'
    }
];

function App(): React.ReactElement {
    return (
        <UrlTable
            //url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
            data={data}
            pageSize={5}
            headers={headers}
            fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
            pagination={{
                pageCount: 1, // don't specify it
                pageRangeDisplayed: 2,
                marginPagesDisplayed: 3

            }}
            // sorting={'compound'}
            // search={'global'}
            uniqProp={'_id'}
        />
    )
}

render(<App/>, document.getElementById('root'));
