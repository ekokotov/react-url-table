// import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";
import React from "react";
import UrlTable from "../../src";
import '../styles.css';
// @ts-ignore
import BasicSearch from './basicSearch.md';
// @ts-ignore
import CustomColumnSearch from './customColumnSearch.md';

storiesOf('Search', module)
    .addParameters(
        {
            readme: {
                sidebar: BasicSearch
            }
        })
    .add('Global search', () =>
        <UrlTable
            search={true}
            url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
            headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
            fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
            indexField={'_id'}
        />
    )

    .addParameters(
        {
            readme: {
                sidebar: CustomColumnSearch
            },
        }
    ).add('Certain column', () =>
        <UrlTable
            search={true}
            url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
            headers={[{name: 'Name', searchable: false}, 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
            fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
            indexField={'_id'}
        />
)
