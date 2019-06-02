import React, {useEffect, useState} from "react";
import {render} from 'react-dom';
import UrlTable from "./src";
import {data} from './mock.json';

const headers = [
    {
        name: 'Name',
        render: (title: string): string => `#${title}`
    }, {
        name: 'Age'
    }, {
        name: 'Eyes'
    }, {
        name: 'Phone'
    }, {
        name: 'Favorite fruit',
        render: function (title: string): React.ReactElement {
            return <div onClick={() => console.log(title)}><b>🍏 ({title})</b></div>
        }
    }
];
// const headerPeople = [
//     {
//         name: 'Email',
//     }, {
//         name: 'Gender'
//     }, {
//         name: 'Cell'
//     }
// ];

function App(): React.ReactElement {
    // const [data, setData] = useState([]);
    // const [page, setPage] = useState(0);
    //
    // useEffect(
    //     () => {
    //         load(`https://randomuser.me/api/?page=${page}&results=10`)
    //             .then((data: { results: [] }) => setData(data.results));
    //     }, [page]
    // );
    return (
        <UrlTable
            //url="https://randomuser.me/api/?page=1&results=10"
            // url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
            data={data}
            pageSize={5}
            headers={headers}
            fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
            pagination={{
                // pageCount: 5, // don't specify it
                pageRangeDisplayed: 0,
                marginPagesDisplayed: 3,
                // onPageChange: (page: { selected: number }): void => {
                //     setPage(page.selected);
                // }
            }}
            // sorting={'compound'}
            // search={'global'}
            uniqProp={'_id'}
        />
    )
}

render(<App/>, document.getElementById('root'));
