import {addParameters, storiesOf} from "@storybook/react";
import UrlTable from "../src";
import {data} from "../__tests__/mocks/mock.json";
import React from "react";
import './styles.css';

addParameters({
    options: {
        isToolshown: false
    },
});

// @ts-ignore
storiesOf('Basic', module)
    .add('From local data',
        () =>
            <UrlTable
                data={data}
                uniqProp={'_id'}
                fields={['name', 'address']}
                headers={['Name', 'Address']}
            />,
        // {
        //     info: {
        //         text: `
        //
        //           ### Notes
        //
        //           light button seen on <https://zpl.io/aM49ZBd>
        //
        //           ### Usage
        //           ~~~js
        //           <PrimaryButton
        //             label={text('label', 'Enroll')}
        //             disabled={boolean('disabled',false)}
        //             onClick={() => alert('hello there')}
        //           />
        //           ~~~
        //
        //         `,
        //     },
        // }
    );
