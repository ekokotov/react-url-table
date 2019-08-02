import {storiesOf} from "@storybook/react";
import UrlTable from "../../src";
import React from "react";
import '../styles.css';
// @ts-ignore
import EditableCells from './editableCells.md';
// @ts-ignore
import EditableColumn from './editableColumn.md';
// @ts-ignore
import EditableWithCallback from './editableWithCallback.md';
import {action} from "@storybook/addon-actions";

storiesOf('Editable Cells', module)
    .addParameters(
        {
            readme: {
                sidebar: EditableCells
            }
        })
    .add('Editable table', () =>
        <UrlTable
            editable={true}
            url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
            headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
            fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
            indexField={'_id'}
        />
    )

    .addParameters(
        {
            readme: {
                sidebar: EditableColumn
            },
        }
    ).add('Certain column', () => <UrlTable
        url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
        headers={['Name', {name: 'Age', editable: true}, 'Eyes', 'Phone', 'Favorite fruit']}
        fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
        indexField={'_id'}
    />
)
    .addParameters(
        {
            readme: {
                sidebar: EditableWithCallback
            },
        }
    ).add('With callback', () => <UrlTable
        editable={true}
        url="https://next.json-generator.com/api/json/get/4k6xmJ21r"
        headers={['Name', 'Age', 'Eyes', 'Phone', 'Favorite fruit']}
        fields={['name', 'age', 'eyeColor', 'phone', 'favoriteFruit']}
        indexField={'_id'}
        onEdit={action('onEdit')}
    />
);
