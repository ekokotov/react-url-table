// import {action} from "@storybook/addon-actions";
import {storiesOf} from "@storybook/react";
import React from "react";
import UrlTable from "../../src";
import '../styles.css';
// @ts-ignore
import SingleSelect from './singleSelect.md';
// @ts-ignore
import MultipleSelect from './multipleSelect.md';
import {action} from "@storybook/addon-actions";

storiesOf('Select row', module)
    .addParameters(
        {
            readme: {
                sidebar: SingleSelect
            },
        }
    ).add('Single record', () =>
    <UrlTable
        selectMode={'single'}
        onSelect={action('onSelect')}
        url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
        headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
        fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
        indexField={'_id'}
    />
)
    .addParameters(
        {
            readme: {
                sidebar: MultipleSelect
            }
        })
    .add('Multiple records', () =>
        <UrlTable
            selectMode={'multiple'}
            onSelect={action('onSelect')}
            url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
            headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
            fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
            indexField={'_id'}
        />
    )


