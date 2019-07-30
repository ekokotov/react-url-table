import {storiesOf} from "@storybook/react";
import UrlTable from "../../src";
import React from "react";
import '../styles.css';
import data from './data_mock.json';
// @ts-ignore
import BasicMD from './basic.md';
// @ts-ignore
import DisabledMD from './disabled.md';
// @ts-ignore
import CustomPageSizeMD from './custom_page_size.md';
// @ts-ignore
import CustomPageCountMD from './custom_page_count.md';

storiesOf('Pagination', module)
    .addParameters(
        {
            readme: {
                sidebar: BasicMD
            },
        }
    ).add('Default', () =>
    <UrlTable
        data={data}
        uniqProp={'_id'}
        fields={['fullname', 'address']}
        headers={['Name', 'Address']}
    />)

    .addParameters(
        {
            readme: {
                sidebar: DisabledMD
            },
        }
    ).add('Without pagination', () =>
    <UrlTable
        data={data}
        uniqProp={'_id'}
        fields={['fullname', 'address']}
        headers={['Name', 'Address']}
        pagination={false}
    />)

    .addParameters(
        {
            readme: {
                sidebar: CustomPageSizeMD
            },
        }
    ).add('Custom settings', () =>
    <UrlTable
        data={data}
        uniqProp={'_id'}
        fields={['fullname', 'address']}
        headers={['Name', 'Address']}
        pagination={{
            pageSize: 3
        }}
    />)

    .addParameters(
        {
            readme: {
                sidebar: CustomPageCountMD
            },
        }
    ).add('Custom page count', () =>
    <UrlTable
        data={data}
        uniqProp={'_id'}
        fields={['fullname', 'address']}
        headers={['Name', 'Address']}
        pagination={{
            pageSize: 3,
            pageCount: 2
        }}
    />)
