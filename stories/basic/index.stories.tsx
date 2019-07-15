import {storiesOf} from "@storybook/react";
import UrlTable from "../../src";
import React from "react";
import '../styles.css';
import data from '../data_mock.json';
// @ts-ignore
import BasicMD from './basic.md';
// @ts-ignore
import WithoutHeaderMD from './without_header.md';
// @ts-ignore
import NestedPropsMD from './nested_props.md';

storiesOf('Basic', module)
    .addParameters(
        {
            readme: {
                sidebar: BasicMD
            },
        }
    ).add('From local data', () =>
    <UrlTable
        data={data}
        uniqProp={'_id'}
        fields={['fullname', 'address']}
        headers={['Name', 'Address']}
    />
)

    .addParameters(
        {
            readme: {
                sidebar: WithoutHeaderMD
            },
        }
    ).add('Without header', () =>
    <UrlTable
        data={data}
        uniqProp={'_id'}
        fields={['fullname', 'address']}
    />
)

    .addParameters(
        {
            readme: {
                sidebar: NestedPropsMD
            },
        }
    ).add('Render nested object fields', () =>
    <UrlTable
        data={data}
        uniqProp={'_id'}
        headers={['First name', 'Surname', 'Address']}
        fields={['name.firstName', 'name.surName', 'address']}
    />
)
