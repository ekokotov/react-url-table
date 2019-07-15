import {storiesOf} from "@storybook/react";
import UrlTable from "../../src";
import React from "react";
import '../styles.css';
// @ts-ignore
import LoadByUrl from './loadByUrl.md';
// @ts-ignore
import LoadByUrlWithFetchSuccess from './loadByUrlWithFetchSuccess.md';

storiesOf('Load by Url', module)
    .addParameters(
        {
            readme: {
                sidebar: LoadByUrl
            },
        }
    ).add('Simple load', () => <UrlTable
        url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
        headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
        fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
        uniqProp={'_id'}
    />
)

    .addParameters(
        {
            readme: {
                sidebar: LoadByUrlWithFetchSuccess
            },
        }
    ).add('Load and map response', () => <UrlTable
        url="https://reqres.in/api/users?page=1&per_page=5"
        fetchSuccess={res => res.data}
        headers={['Email', 'First name', 'Last name']}
        fields={['email', 'first_name', 'last_name']}
        uniqProp={'id'}
    />
);
