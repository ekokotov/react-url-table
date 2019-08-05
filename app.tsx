import React, {useEffect, useState, Fragment} from "react";
import {render} from "react-dom";
import UrlTable from "./src";
import {data as dataMock} from './__tests__/mocks/mock.json';
import {load} from "./src/helper/http";
import {IRecord} from "./src/@typings/types";

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
    const tableData = dataMock;

    return (
        <Fragment>
            {/*<h1>Load by URL</h1>*/}
            {/*<UrlTable*/}
            {/*    url="https://next.json-generator.com/api/json/get/4k6xmJ21r"*/}
            {/*    headers={headers}*/}
            {/*    sorting={"compound"}*/}
            {/*    // showSortingPanel={true}*/}
            {/*    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}*/}
            {/*    indexField={'_id'}*/}
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
            {/*    indexField={'login.uuid'}*/}
            {/*/>*/}
            {/*<h1>Load by URL with compound sorting</h1>*/}
            {/*<UrlTable*/}
            {/*    url="https://next.json-generator.com/api/json/get/4k6xmJ21r"*/}
            {/*    sorting={'compound'}*/}
            {/*    headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}*/}
            {/*    fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}*/}
            {/*    indexField={'_id'}*/}
            {/*    pagination={{*/}
            {/*        pageSize: 5,*/}
            {/*    }}*/}
            {/*/>*/}
            <UrlTable
                data={tableData}
                headers={[{
                    name: 'Name', searchable: false
                },
                    {name: 'Age', editable: true}, 'Company', 'Balance', {name: 'Phone'}, {name: 'Address'}]}
                fields={[{
                    property: 'name'
                }, {property: 'age'}, 'company', 'balance', 'phone', 'address']}
                indexField={'_id'}
                editable={true}
                onEdit={(newValue: string | null, propertyName: string, record: IRecord) => console.log(tableData)}
                search={true}
                selectMode={'single'}
                sorting={'compound'}
                pagination={{
                    pageSize: 5,
                }}
            />
        </Fragment>

    )
}

render(<App/>, document.getElementById('root'));
