import React, {useEffect, useState, Fragment} from "react";
import {render} from 'react-dom';
import UrlTable from "./src";
import {data as dataMock} from './__tests__/mock.json';
import {load} from "./src/helper/http";

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
const headerPeople = [
    {
        name: 'First name'
    }, {
        name: 'Last name'
    }, {
        name: 'Email'
    }, {
        name: 'Avatar',
        render: function (title: string, property: string): React.ReactElement {
            return <div onClick={() => console.log(title, property)}><b>🎩({title})</b></div>
        }
    }
];
const fieldsPeople = [
    {
        property: 'first_name'
    }, {
        property: 'last_name'
    }, {
        property: 'email'
    }, {
        property: 'avatar',
        render: function (avatar: string): React.ReactElement {
            return <img src={avatar} width={50} height={50} alt="avatar"/>
        }
    }
];

function App(): React.ReactElement {
    // const [data, setData] = useState([]);
    // const [page, setPage] = useState(1);
    // const [pageSize] = useState(5);
    // const [totalPages, setTotalPages] = useState(1);
    //
    // useEffect(
    //     () => {
    //         load(`https://reqres.in/api/users?page=${page}&per_page=${pageSize}`)
    //             .then((res: any) => {
    //                 setData(res.data);
    //                 setTotalPages(res.total_pages);
    //             });
    //     }, [page]
    // );
    return (
        <Fragment>
            {/*<h1>Server paging</h1>*/}
            {/*<UrlTable*/}
            {/*    data={data}*/}
            {/*    fields={fieldsPeople}*/}
            {/*    headers={headerPeople} // ['First name', 'Last name', 'Email', 'Avatar']*/}
            {/*    pagination={{*/}
            {/*        serverPaging: true,*/}
            {/*        currentPage: page,*/}
            {/*        pageSize: pageSize,*/}
            {/*        pageCount: totalPages, // u can don't specify this thing*/}
            {/*        pageRangeDisplayed: 0,*/}
            {/*        marginPagesDisplayed: 2,*/}
            {/*        onPageChange: (page: { selected: number }): void => {*/}
            {/*            setPage(page.selected + 1);*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    uniqProp={'email'}*/}
            {/*/>*/}
            {/*<h1>Load by URL</h1>*/}
            {/*<UrlTable*/}
            {/*    url="https://next.json-generator.com/api/json/get/4k6xmJ21r"*/}
            {/*    headers={headers}*/}
            {/*    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}*/}
            {/*    pagination={{*/}
            {/*        pageSize: 5*/}
            {/*    }}*/}
            {/*    uniqProp={'_id'}*/}
            {/*/>*/}
            <h1>Load by URL with fetchSuccess callback</h1>
            <UrlTable
                url="https://randomuser.me/api/?page=1&results=10"
                fetchSuccess={(res: any): [] => res.results}
                headers={['Email', 'Gender', 'Cell']}
                fields={['email', 'gender', 'cell']}
                uniqProp={'uuid'}
            />
            {/*<UrlTable*/}
            {/*    //url="https://randomuser.me/api/?page=1&results=10"*/}
            {/*    // url="https://next.json-generator.com/api/json/get/4k6xmJ21r"*/}
            {/*    data={data}*/}
            {/*    pageSize={5}*/}
            {/*    headers={['Name', 'Age', 'EyeColor', 'Phone', 'FavoriteFruit']}*/}
            {/*    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}*/}
            {/*    pagination={{*/}
            {/*        // pageCount: 5, // don't specify it*/}
            {/*        pageRangeDisplayed: 0,*/}
            {/*        marginPagesDisplayed: 3,*/}
            {/*        // onPageChange: (page: { selected: number }): void => {*/}
            {/*        //     setPage(page.selected);*/}
            {/*        // }*/}
            {/*    }}*/}
            {/*    // sorting={'compound'}*/}
            {/*    // search={'global'}*/}
            {/*    uniqProp={'_id'}*/}
            {/*/>*/}
        </Fragment>

    )
}

render(<App/>, document.getElementById('root'));
