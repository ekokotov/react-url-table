import React from "react";
import {render} from 'react-dom';
import UrlTable from "./src";

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
        <UrlTable url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
                  pageSize={5}
                  headers={headers}
                  fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
            // sorting={'compound'}
            // search={'global'}
                  uniqProp={'_id'}
        />
    )
}

render(<App/>, document.getElementById('root'));
