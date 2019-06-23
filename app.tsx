import React, {useEffect, useState, Fragment} from "react";
import {render} from "react-dom";
import UrlTable from "./src";
import {data as dataMock} from './__tests__/mocks/mock.json';
import {load} from "./src/helper/http";

const headers = [
    {
        name: 'Name',
        render: (title: string): string => `#${title}`,
    }, {
        name: 'Age'
    }, {
        name: 'Eyes',
    }, {
        name: 'Phone',
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
        render: function (title: string): React.ReactElement {
            return <div onClick={() => console.log(title)}><b>🎩({title})</b></div>
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
    // const [loading, setLoading] = useState(true);
    // const [pageSize] = useState(5);
    // const [totalPages, setTotalPages] = useState(1);
    //
    // useEffect(
    //     () => {
    //         load(`https://reqres.in/api/users?page=${page}&per_page=${pageSize}`)
    //             .then((res: any) => {
    //                 setData(res.data);
    //                 setTotalPages(res.total_pages);
    //                 setLoading(false)
    //             });
    //     }, [page]
    // );
    return (
        <Fragment>
            {/*<h1>Server paging</h1>*/}
            {/*<UrlTable*/}
            {/*    data={data}*/}
            {/*    fields={fieldsPeople}*/}
            {/*    loading={loading}*/}
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
            {/*    sorting={"compound"}*/}
            {/*    // showSortingPanel={true}*/}
            {/*    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}*/}
            {/*    uniqProp={'_id'}*/}
            {/*/>*/}
            {/*<h1>Load by URL with fetchSuccess callback</h1>*/}
            {/*<UrlTable*/}
            {/*    url="https://randomuser.me/api/?page=1&results=10"*/}
            {/*    sorting={'simple'}*/}
            {/*    fetchSuccess={(res: any): [] => res.results}*/}
            {/*    headers={['Email', 'Gender', 'Cell', 'State']}*/}
            {/*    fields={['email', 'gender', 'cell', 'location.state']}*/}
            {/*    pagination={{*/}
            {/*        pageSize: 5*/}
            {/*    }}*/}
            {/*    // selectMode={'single'}*/}
            {/*    // onSelect={(record: object) => console.log('Selected records: ', record)}*/}
            {/*    uniqProp={'login.uuid'}*/}
            {/*/>*/}
            {/*<h1>Load by URL with compound sorting</h1>*/}
            {/*<UrlTable*/}
            {/*    url="https://next.json-generator.com/api/json/get/4k6xmJ21r"*/}
            {/*    sorting={'compound'}*/}
            {/*    headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}*/}
            {/*    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}*/}
            {/*    uniqProp={'_id'}*/}
            {/*    pagination={{*/}
            {/*        pageSize: 5,*/}
            {/*    }}*/}
            {/*/>*/}
            <UrlTable
                data={dataMock}
                headers={[{name: 'Name', searchable: false}, {name: 'Age'}, {name: 'Company'}, {name: 'Balance'}]}
                fields={['name', 'age', 'company', 'balance']}
                uniqProp={'_id'}
                search={true}
                sorting={'compound'}
                pagination={{
                    pageSize: 5,
                }}
            />
        </Fragment>

    )
}

render(<App/>, document.getElementById('root'));
