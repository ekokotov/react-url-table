import {storiesOf} from "@storybook/react";
import UrlTable from "../../src";
import {data} from "../../__tests__/mocks/mock.json";
import React from "react";
import '../styles.css';
// @ts-ignore
import BasicMD from './basic.md';

storiesOf('Basic', module)
    .addParameters(
        {
            readme: {
                sidebar: BasicMD
            },
        }
    )
    .add('From local data',
        () =>
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
                headers={['Name', 'Address']}
            />
    );
